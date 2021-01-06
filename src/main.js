import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

import router from './router'
import store from './store/index.js'

import http from '@/utills/api'
import img from '@/utills/img'

Vue.prototype.$http = http
Vue.prototype.$img = img

new Vue({
  router:router,
  store:store,
  data:{
    genmsg:'我是根实例对象'
  },
  render: h => h(App),
}).$mount('#app')
