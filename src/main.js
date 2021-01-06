import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/font/iconfont.css'
import axios from 'axios'

Vue.use(Vant);
// Vue.use(Lazyload);
//设置懒加载
// Vue.use(Lazyload, {
//   lazyComponent: true,
// });

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

//验证token
axios.interceptors.request.use(function(config){
  //每次发送axios的时候，就会把token带给后端
  config.headers.token = localStorage.getItem('token');
  return config;
},function(error){
  //对请求错误做些什么
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


