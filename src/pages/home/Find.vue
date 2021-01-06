<template>
    <div>
       <h1>发现</h1>
           <hr>
        <div class="tab">
              <!-- <span @click="tabToggle(1)" :class='{"on":tabIndex===1}'>今日数据统计</span>
              <span @click="tabToggle(2)" :class='{"on":tabIndex===2}'>昨日数据统计</span> -->
              <router-link tag='span' exact-active-class='on' to="/find/t1">今日数据统计</router-link>
              <router-link tag='span' exact-active-class='on' to="/find/t2">昨日数据统计</router-link>
        </div>
        <div class="content2">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data:function(){
            return {
                tabIndex:1
            }
        },
        methods:{
           tabToggle(data){
           this.tabIndex = data
                  this.$router.push('/find/t'+data)
             
               
          
             
           } 
        }
    }
</script>

<style lang="css" scoped>
  .tab{
       line-height: 35px;
       display: flex;
       justify-content: space-between;
   }
   .tab span{
       flex: 1;
       border:1px solid #ccc;
       text-align: center;
       cursor: pointer;
   }
   .tab span.on{
       color:black
   }
</style>