import Vue from 'vue'
import VueRouter  from 'vue-router'
Vue.use(VueRouter) //注册

import arr from './pages/index.js'

import { Login} from "@/components/index.js";

// 定义路由匹配规则

// 从自定义菜单数据中取出路由匹配规则
let routes = []

arr.map(ele=>{
    routes = [...routes,...ele.arr]
})

const router = new VueRouter({
    // 定义路由模式  默认是hash(有#号，跟在端口后面) 路由  还可以改成 history(没有#号)
    //  /#/home       /home
    mode:'hash',
    // 定义路由匹配规则
    routes:[
        ...routes,
        // 动态路由/home/:id
        // 动态路由一般用于从列表页面到详情页面传递id
        // 在详情页面有两种接收参数的方式，一种使用this.$route.params.id
        // 另外一种使用 props 传值
      
                                                        // 开启props传值,用的较少                   
        // {path:'/music/detail/:id',component:MusicDetail,props:true},
        {path:'/login',components:{
             login:Login
        }},
        {path:'/*',redirect:'/'},
       
]
})



export default router