import axios from 'axios'
import { notification, message } from 'ant-design-vue'
import store from '../store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURI: process.env.BASE_URL,
  timeout: 50000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 20000) {
      message.error(res.message)

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        const key = `open${Date.now()}`
        notification.error({
          message: `异常: ${res.code}`,
          description: errortext,
        })
      }
      return Promise.reject('error') // eslint-disable-line
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    switch (error.response.status) {
      case 401:
        break
      case 404:
        this.router.push({name: '404'})
        break
      case 500:
        this.router.push({name: '500'})
        break
    }
    return Promise.reject(error)
  }
)

export default service
