<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="handleClick">
     sss{{dog.name}}sss{{cat.name}}
    <HelloWorld msg="Welcome to Your Vue.js App"/>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import Vue from 'vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      dog: {
        // name: ''
      },
      cat: {
      }
    }
  },
  mounted () {
    // this.dog = Vue.observable(this.dog)
  },
  methods: {
    handleClick () {
      this.cat = { name: 'maomao' }
      // this.$set(this.dog, 'name', 'xxxx')
      this.dog.name = 'xxxxx'
      this.dog = Object.assign({}, this.dog)
      setTimeout(() => {
        // Vue.set(this.dog, name, 'oo444ooo')
        this.dog.name = 'oo444ooo'
        this.cat.name = 'maomao3333'
      }, 2000)
    }
  }
}
</script>
