import axios     from 'axios'
import router    from '../router'
import store     from '../store'
import {Message} from 'element-ui'
// import Urls from '../api/systemConfif.js'
axios.defaults.timeout = 10000 //响应时间
//axios.defaults.headers.post['Content-Type'] = 'application/json'; //配置请求头
//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'; //配置请求头
//axios.defaults.baseURL = 'http://markstudio:7888' //配置接口地址
axios.defaults.baseURL = 'http://ms.youdongtai.com' //配置接口地址
//来判断是否开发环境
// if (process.env.NODE_ENV === 'development') {
//     axios.defaults.baseURL = Urls.baseurl.value; //配置接口地址
// } else {
//     axios.defaults.baseURL = Urls.baseurl.value; //配置接口地址
// }
//添加Token
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  /* if (config.method === 'post') {
       config.data = JSON.stringify(config.data);
   }*/
  if (localStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  }
  return config
}, (error) => {
  console.log('错误的传参')
  return Promise.reject(error)
})
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  //对响应数据做些事
  if (res.data.status === 'success') {
    // 返回通用数据
    return Promise.resolve(res.data)
  }
  return res
}, (error) => {
  console.log('网络异常')
  //console.log(error)
  // 判断是否登录,登录才提示错误信息
    Message({
      message: error.response.data ? error.response.data.message : error.message,
      type: 'error',
      duration: 3 * 1000,
      offset: 100
    })

  /* if (error.code === 'ERR_NETWORK'){
       //alert('网络异常,无法连接到服务器')
       // 退出成功,通知刷新页面
       //localStorage.removeItem('userInfo')
       //Vue.$event.emit('LOGIN_SUCCESS', '')
       store.dispatch('user/setUserInfo',null)

       //window.$events.emit('LOGIN_SUCCESS', '')
       // 跳转页面
       /!*router.push({
           path: '/login',
           params: {data: 'login'}
       })*!/
   }*/
  if (error.response.status === 401) {
    // 认证失败,跳转页面
    router.push({
      path: '/login',
      params: {data: 'login'}
    })
  }
  return Promise.reject(error)
})
export const HTTP = {
  before: function(callback) {
    callback()
    return this
  },
  post: (url, params) => {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
           .then(response => {
             resolve(response)
           }, err => {
             reject(err)
           })
           .catch((err) => {
             reject(err)
           })
    })
  },
  get: (url, param) => {
    return new Promise((resolve, reject) => {
      axios.get(url, {params: param})
           .then(response => {
             resolve(response)
           }, err => {
             reject(err)
           })
           .catch((error) => {
             reject(error)
           })
    })
  }
}

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
         .then(response => {
           resolve(response)
         }, err => {
           reject(err)
         })
         .catch((err) => {
           reject(err)
         })
  })
}

////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: param})
         .then(response => {
           resolve(response)
         }, err => {
           reject(err)
         })
         .catch((error) => {
           reject(error)
         })
  })
}

export default {
  fetchPost,
  fetchGet
}