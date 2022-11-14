// 创建一个共享的仓库store

export default {
  state: {
    user:{
      name:'张三',
      age:19,
      sex:'男'
    }
  },
  setUserNameAction(name){
    this.state.user.name = name
  }
}



