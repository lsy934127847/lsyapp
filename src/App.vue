<template>
  <div id="app">
     <!-- <Login> </Login> -->
     <router-view v-if="$route.path === '/login'" name="login"></router-view>

    <Qflayout v-else></Qflayout>
    <!-- <img alt="Vue logo" src="./ssets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- 视图容器 -->
    <!-- 把url所匹配成功的组件显示出来 -->
    <!-- <router-view></router-view> -->
    <!-- <div class="list"> -->
      <!-- <a href="/#/home">首页概况</a>
      <a href="/#/finds">公司动态</a>
      <a href="/#/user">个人中心</a> -->

       <!-- 声明式路由跳转 -->
      <!-- 相当于a标签  router-link被编译后 默认为a标签-->
      <!-- tag 属性可以改变router-link的 渲染标签  -->
       <!-- active-class 设置连接激活时添加该类名 -->
       <!-- exact 属性默认值是false 表示包含匹配 设置为true 表示精确匹配 -->
        <!-- exact-active-class="on" 精确匹配 -->
  <!-- <div v-for="list in routes" :key="list.id">
        <router-link  
      :to='list.path' 
      tag="div" 
     :exact='list.exact'
     active-class="on"
      v-text="list.text"
      v-if=" !list.isNotMusicDetail"
      ></router-link>
   </div> -->
   


    <!-- </div> -->
    <!-- <div class="content"> -->
      <!-- 视图容器 将匹配成功的组件显示出来 -->
      <!-- 可以定义多个router-view 标签 -->
       <!-- <router-view name = "default"> </router-view> -->
       <!-- <router-view name = "default"> </router-view> -->
       <!-- <router-view name = "gege"> </router-view>
       <router-view name = "didi"> </router-view> -->
       <!-- <router-view name = "yeye"> </router-view> -->
        <!-- <router-view name = "default"> </router-view> -->
    <!-- </div> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import routes from "./pages/";
import {  Qflayout,} from "@/components/index.js";

export default {
  name: "App",
  components: {
    // HelloWorld
    // routerView
    Qflayout,
    // Login
  },
  data: function() {
    return {
      routes,
      appmsg:'我是AAPPP'
    };
  },
  watch: {
    $route: function(to, from) {
      console.log("url发生了变化", to, from);
    }
  },
  // mounted(){
  //   console.log('$route',this.$route)
  // }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html,body{
  width:100%;
  height:100%;
  overflow: hidden;
}
.list {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  bottom: 0;
  background-color: black;
  color: bisque;
}
.list div {
  line-height: 40px;
  text-align: center;
  display: block;
  cursor: pointer;
  color: white;
}
.list div:hover {
  color: #ccc;
}
.list div.on {
  color: red;
}
.content {
  position: absolute;
  top: 0;
  left: 150px;
  /* width:150px; */
  bottom: 0;
  right: 0;
  background-color: forestgreen;
  color: bisque;
}
#app{
  height:100%;
}

</style>
