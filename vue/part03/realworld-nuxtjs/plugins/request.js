import axios from 'axios'

const baseURL = 'https://conduit.productionready.io'
export const request = axios.create({
  baseURL
})


export default ({store})=>{ // context
  // 请求拦截
  request.interceptors.request.use(function(config){
    const { user } = store.state
    if(user && user.token){
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  },function(err){
    return Promise.reject(err)
  })

}

