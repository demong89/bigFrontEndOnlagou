import axios from 'axios'

const baseURL = 'https://conduit.productionready.io'
const request = axios.create({
  baseURL
})


export default request