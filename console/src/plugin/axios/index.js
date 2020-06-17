import axios from 'axios'
import { cookieGet } from '@/common/cookie'
import { Message,Loading } from 'element-ui'
import { isPlainObject } from 'lodash'
import qs from 'qs'
import store from '@/store'


let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: 'loading……',
        background: 'rgba(0, 0, 0, 0.1)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

// 记录和显示错误
function errorLog(info) {
  // 显示提示
  Message({
    message: info,
    type: 'error',
    duration: 5 * 1000
  })
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 1000 * 180,
  withCredentials: true
})

/**
 * 请求拦截
 */
service.interceptors.request.use(config => {
  config.headers['Accept-Language'] = cookieGet('language') || 'zh-CN'
  config.headers['token'] = cookieGet('token') || ''
  config.headers['content-type'] = 'application/x-www-form-urlencoded; charset=utf-8'
  // 默认参数
  var defaults = {}
  // 防止缓存，GET请求默认带_t参数
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      ...{ '_t': new Date().getTime() }
    }
  }
  if (isPlainObject(config.params)) {
    config.params = {
      ...defaults,
      ...config.params
    }
  }
  if (isPlainObject(config.data)) {
    config.data = {
      ...defaults,
      ...config.data
    }
    if (/^application\/x-www-form-urlencoded/.test(config.headers['content-type'])) {
      config.data = qs.stringify(config.data)
    }
  }
  showFullScreenLoading();
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
service.interceptors.response.use(response => {
  let code = response.data.code
  let msg = response.data.msg
  tryHideFullScreenLoading();
  if (code === 401 || code === 10001) {
    store.dispatch('d2admin/account/logout')
    return Promise.reject(msg)
  } else if (code !== 0) {
    errorLog(msg)
    return Promise.reject(msg)
    // return response.data
  } else {
    return response.data
  }
}, error => {
  tryHideFullScreenLoading();
  errorLog(error.message)
  return Promise.reject(error)
})

export default service
