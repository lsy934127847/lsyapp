import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from '../store'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};


Vue.use(VueRouter)

const routes = [

  {
    path:'/home/:city',
    name:'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path:'/city',
    name:'city',
    component:() => import('../components/City.vue'),
  },
  {
    path:'/mine',
    name:'mine',
    component: () => import('../views/Mine.vue'),
  },

  //增加地址
  {
    path: '/adds',
    name: 'add',
    component: () => import('../components/Address_add')
  },
   {
     path: '/adds2',
     name: 'add',
     component: () => import('../components/Address_add2')
   },
  //修改地址
  {
    path:'/edit/:id',
    name:'edit',
    component:() => import('../components/Address_edit')
  },
  {
    path:'/category/:categoryName/:cityName',
    name: 'category',
    component: () => import('../views/Category.vue'),
  },
  {
    path:'/detail/:id/:cityName',
    name:'detail',
    component: () => import('../views/Detail.vue'),
  },
  //注册登录模块：
  {
    path:'/login',
    name:'login',
    component:() => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path:'/search',
    name:'search',
    component:() => import('../components/Search.vue')
  },
  {
    path:'/calendar',
    name:'calendar',
    component:() => import('../components/Calendar.vue')
  },
  {
    path:'/discuss',
    name:'discuss',
    component:() => import('../components/Discuss.vue')
  },
  //添加订单
  {
    path:'/orders',
    name:'orders',
    component:() => import('../components/Orders_add.vue'),
    children:[
      {path:'gets',name:'address',component: () => import('../components/Address_get')}
    ]
  },
  {
    path:'/orders/:address',
    name:'orders',
    component: () => import('../components/Orders_add.vue')
  },
  //查看用户的所有订单
  {
    path: '/orders_get',
    name: 'ordersAll',
    component: () => import('../components/Orders_get.vue')
  },
  // {
  //   path: '/*',
  //   redirect:'/home'
  // },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫，所有的路由都会走到这里
router.beforeEach((to,from,next)=>{
  if(to.path == '/login' || to.path == '/register'){
    next();
  }
  else{
    //var token = localStorage.getItem('token');//本地取token
    // if (!token) {
    //   next('/login');
    // } else {
    //   next();
    // }

    //通过axios把token发送给后端进行验证token是否真实存在，提高安全性
    axios.get('/api/users/testtoken').then((res) => {
      if(res.data.code == 0){
          // console.log("111");
          store.commit('SET_USERID',res.data.userId);
          // console.log(to.path)
          // console.log('成功，，，，，，，，，')
          next();
      }
      else{
        // console.log('错误1，，，，，，，，，')
        next('/login');
      }
    }).catch(()=>{
      // console.log('错误，，，，，，，，，')
        next('/login');
    });
  }

})


export default router
