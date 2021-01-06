
// 路由懒加载 ，只加载当前页面url对应的组件
const Home = ()=>import('../pages/home/Home.vue') 
const User = ()=>import('../pages/user/User.vue')
const Find = ()=>import('../pages/home/Find.vue')
// const MusicList = ()=>import('../pages/music/MusicList.vue')
const MusicDetail = ()=>import('../pages/music/MusicDetail.vue')
const Todo = ()=>import('../pages/home/Todo.vue')

const GoodList = ()=>import('../pages/good/GoodList.vue')
const GoodAdd = ()=>import('../pages/good/GoodAdd.vue')

console.dir(Home)
Home().then(function(data){
   console.log(data.default.data().msg)
})
// console.dir()

import {Homedatatoday,HomedataYestoday}  from  '../components/index.js'
// import Home from '../pages/home/Home.vue'
// import User from '../pages/user/User.vue'
// import Find from '../pages/home/Find.vue'
// import MusicList from '../pages/music/MusicList.vue'
// import MusicDetail from '../pages/music/MusicDetail.vue'
const routes = [
    {
        id:10,
        text:'首页概况',
        icon:'el-icon-location',
        arr:[
            {
                id: 1001,
                path: '/',
                   component:Home,
                // 当访问首页时，使用youyou视图容器 来承载Home组件
                // components: {
                //     youyou: Home,
                //     // didi: User,
                //     // default: MusicList
                // },
                // true 表示精确匹配
                // false 表示包含匹配
                exact:true,
                text: '首页概况',
             
            },
            {
                id: 1002,
                path: '/find',
                   component:Find,
                // components: {
                //     gege: Find
                // },
              
                text: '公司新闻',
                children:[
                    // 二级路由不能加/，系统自动加
                    {path:'t1',component:Homedatatoday},  //  /find/t1
                    {path:'t2',component:HomedataYestoday},//  /find/t2
                    {path:'',redirect:'/find/t1'}, //  /find
                    {path:'*',redirect:'/find/t1'} //  /find/  之后任何字符都能匹配
                ]
            },
            {
                id:1003,
               
                text:'TodoList',
                path:'/todo',
                component:Todo,
              },
        ]
    },
    {
        id:11,
        text:'系统管理',
        icon:'el-icon-location',
        arr:[
            {
                id: 3,
                path: '/userdskflsdfkjsldfj',
                //    路由别名，当前路由path的容易记忆的小名
                alias: '/u',
                //    路由命名，给路由规则取了一个名字
                name: 'me',
                   component:User,
                // components: {
                //     didi: User
                // },
              
                text: '个人中心',
            }, 
        ]
    },
    {
        id:12,
        text:'音乐管理',
        icon:'el-icon-location',
        arr:[
            {
                id: 1201,
                path: '/music',
                //    component:MusicList,
                components: {
                    yeye: ()=>import('../pages/music/MusicList.vue')
                },
              
                text: '音乐列表',
            },
            {
                id: 1202,
               
                text: '音乐详情',
                path: '/music/detail/:id',
                component: MusicDetail,
                // 判断是否是音乐详情，如果不是音乐详情，就显示，如果是音乐详情，就显示
                isNotMusicDetail: true
            },
        ]
    },
    {
        id:13,
        text:"商品管理",
        icon:"el-icon-goods",
        arr:[
            {
                id:1301,
                text:"商品列表",
                path:"/good/list",
                component:GoodList,

            },
            {
                id:1302,
                text:"商品新增",
                path:"/good/add",
                component:GoodAdd,
                // isNotMusicDetail: true
            }
        ]
    }
]


/*

const routes = [
    {
        id: 1,
        path: '/',
           component:Home,
        // 当访问首页时，使用youyou视图容器 来承载Home组件
        // components: {
        //     youyou: Home,
        //     // didi: User,
        //     // default: MusicList
        // },
        // true 表示精确匹配
        // false 表示包含匹配
        exact:true,
        text: '首页概况',
     
    },
    {
        id: 2,
        path: '/find',
           component:Find,
        // components: {
        //     gege: Find
        // },
      
        text: '公司新闻',
        children:[
            // 二级路由不能加/，系统自动加
            {path:'t1',component:Homedatatoday},  //  /find/t1
            {path:'t2',component:HomedataYestoday},//  /find/t2
            {path:'',redirect:'/find/t1'}, //  /find
            {path:'*',redirect:'/find/t1'} //  /find/  之后任何字符都能匹配
        ]
    },
    {
        id: 3,
        path: '/userdskflsdfkjsldfj',
        //    路由别名，当前路由path的容易记忆的小名
        alias: '/u',
        //    路由命名，给路由规则取了一个名字
        name: 'me',
           component:User,
        // components: {
        //     didi: User
        // },
      
        text: '个人中心',
    },
    {
        id: 4,
        path: '/music',
        //    component:MusicList,
        components: {
            yeye: ()=>import('../pages/music/MusicList.vue')
        },
      
        text: '音乐列表',
    },
    {
        id: 5,
       
        text: '音乐详情',
        path: '/music/detail/:id',
        component: MusicDetail,
        // 判断是否是音乐详情，如果不是音乐详情，就显示，如果是音乐详情，就显示
        isNotMusicDetail: true
    },
    {
      id:89,
     
      text:'TodoList',
      path:'/todo',
      component:Todo,
    },
]
*/
export default routes

// v-if  和v-for不要作用在一个标签上