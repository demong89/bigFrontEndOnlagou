<template>
 <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center"> {{ isLogin ? 'Sign in': 'Sign up'}} </h1>
        <p class="text-xs-center">
          <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
          <nuxt-link v-else to="/register">Need an account?</nuxt-link>
        </p>

        <ul class="error-messages">
          <template v-for="(messages,field) in errors">
             <li v-for="(msg,index) in messages" :key="index">{{field}}{{msg}}</li>
          </template>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset class="form-group" v-if="!isLogin">
            <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.email" type="email" required class="form-control form-control-lg" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.password" required class="form-control form-control-lg" type="password" minlength="8" placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
           {{ isLogin ? 'Sign in': 'Sign up'}} 
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { login , register} from '@/api/user'
const Cookie = process.client ? require('js-cookie'):undefined
  export default {
    middleware: 'noAuthenticated',
    computed: {
      isLogin(){
        return this.$route.name === 'login'
      }
    },
    data () {
      return {
        user:{
          username:'',
          email:'',
          password:''
        },
        errors:{}
      }
    },
    methods: {
      async onSubmit(){
        try {
           const {data} = this.isLogin ? await login({user:this.user}) : await register
           ({user:this.user})
           console.log(data)
            this.$store.commit('setUser',data.user)
            // 数据持久化
            Cookie.set('user',data.user)
           this.$router.push('/')
        } catch (err) {
          console.dir(err)
          this.errors = err.response.data.errors
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>