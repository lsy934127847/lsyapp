import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import city from './modules/city'
import category from './modules/category'
import detail from './modules/detail'
import search from './modules/search'
import calendar from './modules/calendar'
import getAddress from './modules/address_get'
import editAddress from './modules/address_edit'
import getOrders from './modules/orders_get'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,

  //保存用户的userId
  state:{
    userId:'',
    indexItem:'',
  },

  mutations:{
    SET_USERID(state,payload){
      state.userId = payload;
    },
    SET_INDEXITEM(state,payload){
      state.indexItem = payload;
    }
  },

  modules: {
    home: home,
    city:city,
    category:category,
    detail: detail,
    search:search,
    calendar:calendar,
    getAddress: getAddress,
    editAddress:editAddress,
    getOrders: getOrders,
  }
})

export default store;
