<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue33.js App"/>
    <HelloWorld1 msg="另一个组件" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HelloWorld1 from './components/HelloWorld.vue'


export default {
  name: 'App',
  components: {
    HelloWorld,
    HelloWorld1
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
