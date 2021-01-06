<template>
    <div>
        <h1>音乐列表</h1>
        <div>
            <input type="text" v-model="star" @keyup.enter="search">
        </div>
        <div>
           <div v-for="item in musicList " :key="item.id" @click="skipToDetail(item)">
               <span v-text="item.id"></span>
                    <span>{{item.genre}}</span>
                    <span v-text="item.name"></span>
             <!-- 声明式导航 -->
               <!-- <router-link to="/music/detail" tag="div">
                    <span v-text="item.id"></span>
                    <span>------</span>
                    <span v-text="item.name"></span>
               </router-link> -->
           </div>
        </div>
        
    </div>

</template>

<script>
// import { fetchQQmusic } from "@/utills/api.js";

import { mapState,mapActions } from 'vuex'
    export default {
        data:function(){
            return {
                // list:[
                
                // ],
                star:''
            }
        },
        mounted(){
  
        },
        computed:{
            // 从一个名叫 叫music 的子store 中引入 musicList 这个变量
            // 然后就可以使用 this.musicList来访问
            ...mapState('musicModule',['musicList'])
        },
        methods:{
              ...mapActions('musicModule',['getMusic']),

            skipToDetail(item){
                // 编程式路由导航
                // 动态路由
                this.$router.history.push('/music/detail/'+item.id)
                // push   跳转到不同的url，但这个方法会向history栈添加一个记录，点击后退会返回到上一个页面。
                //// replace  描述：同样是跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。
                // back 
                // go(n)  相对于当前页面向前或向后跳转多少个页面,类似 window.history.go(n)。n可为正数可为负数。正数返回上一个页面
            },
          
            search(){
  let str = 'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=64874939891357674&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
         let params = {}
         str.split('&').forEach(value=>{
            var arr =  value.split('=')
            params[arr[0]] = arr[1]
         })
         params.w = this.star
         params.n = 20
        //  this.$store.dispatch('getMusic',params)
        this.getMusic(params)
         this.star = ''
        //  console.log(this.$store.state.musicList)
         console.log('1232')
        //  fetchQQmusic(params).then(res=>{
        //     //  console.log('123')
        //      console.log('音乐res',res)
        //       this.list = res.song.list
        //       this.star = ''
        //  })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>