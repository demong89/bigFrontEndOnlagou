<template>
  <div>
  <Steps :count="count" :active="active"></Steps>
  <button @click="next">next</button>
  </div>
</template>

<script>
import Steps from './Steps'
export default {
  components:{Steps},
  data(){
    return {
      count:4,
      active:0
    }
  },
  methods:{
    next(){
      this.active++
    }
  }
}
</script>

<style>

</style>