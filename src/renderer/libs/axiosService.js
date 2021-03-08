import axios from 'axios'
// import Urls from '../api/systemConfif.js'
axios.defaults.timeout = 10000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json'; //配置请求头
axios.defaults.baseURL = 'http://localhost:3000'; //配置接口地址
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
    if (config.method === 'post') {
        config.data = JSON.stringify(config.data);
    }
    if (sessionStorage.getItem("vntoken") != null) {
        config.headers.token = sessionStorage.getItem("vntoken")
    }
    return config;
}, (error) => {
    console.log('错误的传参')
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
    //对响应数据做些事
    if (!res.data.success) {
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    console.log('网络异常')
    return Promise.reject(error);
});

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: param })
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
    fetchGet,
}