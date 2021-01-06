
import axios from 'axios'

//  生产环境 
//  测试环境
//  开发环境
const baseURL = 'http://localhost:8080'

// const apiVersion = '/api/v1'

// 创建一个axios实例对象
const instance = axios.create({
  baseURL,
  timeout: 7000,
  headers: {}
});

// instance 是一个函数

// 封装请求拦截器
instance.interceptors.request.use(function (config) {

  //    请求发送之前，可以做一些事情，比例 加token 用于验证身份
  //  携带token
  config.headers.Authorization = localStorage.getItem('token')
  // console.log('请求拦截器',config)

  console.log('config', config)
  return config;
}, function (error) {

  return Promise.reject(error);
});


// 封装响应拦截器
instance.interceptors.response.use(function (response) {
  // 当后端返回数据，抵达 客户端时
  // 要数据过滤
  // 对后端响应的错误信息进行处理
  // console.log('响应拦截器',response)
  console.log('response')
  console.log(response)
  let res
  if (response.status === 200) {
    if (response.data) {
      let err = response.data.err
      if (err === 0) {
        res = response.data.data
      } else if (err != 0) {
        //  当token无效时返回登陆首页
        // alert('用户名或密码错误')
        res = false
        // window.location.href = '/login'
      }
    }


  } else {
    alert('错误')
  }
  return res;
}, function (error) {
  return Promise.reject(error);
});

console.log('instance')
console.log(instance)

// instance 是一个函数也是一个对象

// 所有的函数是对象,但 所有的对象 不一定 是函数

export default instance