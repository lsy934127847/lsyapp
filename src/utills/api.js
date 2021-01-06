
/*
https://c.y.qq.com
*/
/*
/soso/fcgi-bin/client_search_cp?ct=24
&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&
searchid=64874939891357674&t=0&aggr=1&cr=1&catZhida=1&
lossless=0&flag_qc=0&p=1&n=10&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&
g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&
format=json&inCharset=utf8&outCharset=utf-8&notice=0&
platform=yqq.json&needNewCode=0
*/

import fetch from './axios.js'

console.dir('fetch')
console.dir(fetch)
// 获取QQ音乐
export function fetchQQmusic(params){
  return  fetch({
        url:'/soso/fcgi-bin/client_search_cp',
        method:'GET',
        // GET 请求用 params  post 请求用data
        params,
    })
}

// 登录

// axios 的GET 请求 用 params 选项向后端传递数据
// axios POST 请求 用 data 选项向后端传递数据

//  确认是 GET 还是POST
//  URL 是多少
//  怎么传参：总共有哪些参数，哪些是必填参数，哪些是非必填
//  后端传递数据过多: 缓存渲染 数据类型
//  TS 是强类型语言 ，定义变量的时候已经确定是哪种类型的变量
//  

export function fetchLogin(data){
    return fetch({
        url:'/api/v1/user/login',
        method:'post',
        data,
    })
}

// 商品添加
export function fetchAddorEdit(data){
    return fetch({
        url:'/api/v1/good/addOrEdit',
        method:'post',
        data,
    })
}


// 商品添加
export function fetchAllCates(params){
    return fetch({
        url:'/api/v1/good/cates',
        method:'get',
        params,
    })
}


// 商品列表
export function fetchGoodList(params){
    return fetch({
        url:'/api/v1/good/list',
        method:'get',
        params,
    })
}

// 删除
export function fetchGoodDel(params){
    return fetch({
        url:'/api/v1/good/delete',
        method:'get',
        params,
    })
}
export default {
    fetchQQmusic,
    fetchLogin,
    fetchAddorEdit,
    fetchAllCates,
    fetchGoodList,
    fetchGoodDel
}
