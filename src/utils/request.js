import axios from 'axios'
import router from '../router'
import Message from '@/utils/message'
import { notification } from 'ant-design-vue'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
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
    if (res.code !== 200) {
      Message({
        type: 'error',
        message: res.message
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // const key = `open${Date.now()}`
        notification.error({
          message: `异常: ${res.code}`,
          description: res.message
        })
      }
      return Promise.reject('error') // eslint-disable-line
    } else {
      return response.data
    }
  },
  error => {
    console.log(error.response.status) // for debug
    switch (error.response.status) {
      case 401:
        localStorage.removeItem('user')
        router.push({name: 'login'})
        break
      case 404:
        router.push({name: '404'})
        break
      case 500:
        router.push({name: '404'})
        break
    }
    // return Promise.reject(error)
  }
)

export default service
