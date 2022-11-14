import store from './smallStore'

export default {
  data(){
    return {
      shareStore:store.state
    }
  },
  methods: {
    change(){
      store.setUserNameAction('lishi')
    }
  }
}