import Vue from 'vue'
import App from './App.vue'
import './test.lint'

import './style.less'

Vue.config.productionTip = false

const a = 123

new Vue({
  render: h => h(App)
}).$mount('#app')
