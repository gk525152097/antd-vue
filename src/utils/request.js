/**
 * 请求封装
 * 实例配置: 设置baseUrl 和 timeout
 * 请求拦截: 为深入配置 可进行token配置
 * 响应拦截: 与后台进行配置 主要拦截 response status异常 以及 返回结果错误
 */

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
      // 不能放在这里 会导致所有请求 都会有请求提示
      // Message({
      //   type: 'success',
      //   message: res.message
      // })
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
