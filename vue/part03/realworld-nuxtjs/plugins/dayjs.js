import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date',(val,format='YYYY-MM-DD')=>{
  return dayjs(val).format(format)
})