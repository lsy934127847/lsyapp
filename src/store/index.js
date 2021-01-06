

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import todoModule from './modules/todo'
import musicModule from './modules/music'

// import {fetchQQmusic} from '@/utills/api.js'
const store = new Vuex.Store({
    // state 是存储中心，所有需要被共享或缓存的数据，都在这里定义
    state:{
        // msg:'hello vuex',
        // list:[],
        // musicList:[]
    },
    // getters 相当于组件的计算属性，与state相关，当它所关联的state变量发生变化时，会重新计算
    getters:{
        // total(state){
        //     return state.list.length
        // }
    },
    // mutations 是vuex中 是专门用于更新state 数据管理更规范，调试工具有记录
    mutations:{
        // addTask(state,payload){ 
        //    console.log('addTask',state,payload)
        //    state.list.push({
        //        task:payload,
        //        id:Date.now()
        //    })
        // },
        // delTask(state,payload){
        //     state.list = state.list.filter(ele=>{
                
        //             return ele.id!==payload
                
                
        //     })
        // },
        // updateMusicList(state,payload){
        //     state.musicList = payload
        //     console.log(this.musicList)
        // }
    },

    // actions是专门与后端API打交到的
    actions:{
        // fetchQQmusic
        // getMusic(store,payload){
        //     fetchQQmusic(payload).then(res=>{
        //         // let s = res.song.list
        //         // store.state.musicList = S
        //         store.commit('updateMusicList',res.song.list)
        //     })
        // }
    },
    modules:{
        todoModule,
        musicModule,
    }
})

export default store

// this.$store.state.msg 根

// this.$store.state.todoMudule.msg  模块