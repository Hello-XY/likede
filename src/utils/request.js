// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getTokenTime } from './auth'
import router from '@/router'

/* 判断token是否过期 */
const istimeout = () => {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 2 * 60 * 60 * 1000
  return currentTime - tokenTime > timeout
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use(async (config) => {
  if (store.state.user.token) {
    if (istimeout()) {
      await store.dispatch('user/logout')
      router.push('/login')
      Message.error('登录状态失效')
    } else {
      config.headers.Authorization = store.state.user.token
    }
  }
  return config
}) // 请求拦截器
service.interceptors.response.use('', async (error) => {
  if (error?.response?.status === 401) {
    Message.error('登录状态失效')
    await store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(error.msg)
  }
  return Promise.reject(error)
}) // 响应拦截器
export default service // 导出axios实例
