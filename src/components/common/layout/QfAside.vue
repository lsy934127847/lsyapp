<template>
    <div class="qf-Aside">
         <!-- <h1>Aside</h1> -->
           
    <!-- <h5>自定义颜色</h5> -->
    <div class="qf-logo">
        <img  :src="img.logo" alt="" class="logo">
    </div>
        <el-menu
        
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
            >
            
<!-- 一层循环 -->
            <el-submenu  v-for="group in routes" :key="group.id" :index="group.id+''">
                <template slot="title">
                  <i :class="group.icon"></i>
                  <span v-text="group.text"></span>
                </template>
                <!-- 二层循环 -->
                <!-- <div> -->
                    <!-- v-for 和v-if 不可同时使用 ,可将v-if 换成v-show  -->
                    <el-menu-item  
                
                    v-for="nav in group.arr" 
                    :key="nav.id" :index="nav.id+''" 

                    
                    v-show="!nav.isNotMusicDetail"      
                    >
                    <router-link  tag="div" :to="nav.path" v-text="nav.text"></router-link>
                    </el-menu-item>
                <!-- </div> -->
                
                 
            </el-submenu>  
      </el-menu>
       
    </div>
</template>

<script>
import routes from '@/pages/index.js'
import img from '@/utills/img.js'
export default {
    data:function(){
        return {
           routes ,
           img
        }
    }
};
</script>

<style lang="scss" scoped>

.logo{
    width:100px;
    height:100px;
    border-radius: 50%;
    display: block;
    margin:0px auto;
    // padding-top:20px;
    margin-bottom:20px;
    cursor: pointer;
  
}
 .qf-logo{
       padding-top:20px;
   }
</style>