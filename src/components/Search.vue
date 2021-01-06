<template>
  <div id="search">
        <form action="/" class="searchs">
            <van-search
              v-model.trim="value"
              show-action
              placeholder="搜索演出、场馆、活动内容..."
              @cancel="onCancel"
            />
        </form>
        <!-- 热搜栏 -->
        <p class="title">热搜</p>
        <ul class="hotSearch">
          
            <li v-for="(item,index) in hotList" :key="index" class="hotList" @click="put(item)">
              {{item}}
            </li>
        </ul>
        <!-- 搜索结果栏 -->
        <ul class="result">
          <!-- 此处的样式可以和首页搜索的样式重用 -->
          <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
            <li v-for="(item,index) in Result" :key="index" class="RecommendList">
              <div class="RecommendList_img">
                  <img :src="item.verticalPic" alt="">
              </div>
              <div class="RecommendList_right">
                    <p class="Name">{{item.name}}</p> 
                    <p class="RecommendList_right_time">{{item.showTime}}</p>
                    <p class="RecommendList_right_place">
                      <span>{{item.cityname}} | </span>
                      <span>{{item.venueName}}</span>
                    </p>
                    <span v-show="item.isSelectSeat === true" class="select">
                      可选座
                    </span>
                    <span v-show="item.isEticket === true" class="select">
                      电子票
                    </span>
                    <span v-show="item.isAotu === true" class="select">
                      自动取票
                    </span>
                    <div class="RecommendList_right_bottom">
                      <span class="RecommendList_right_price">￥{{item.priceLow}}</span> <span class="qi">起</span>
                      <span class="RecommendList_right_rate">
                          <van-rate v-model="item.itemScore" readonly class="xingxing"  color="#ff9747"/>
                      </span>
                      <span>{{item.itemScore}}</span>
                    </div>
              </div>
            </li>
          <!-- </van-pull-refresh>   -->
        </ul>


  </div>
</template>

<script>
import { Search, PullRefresh , Lazyload } from 'vant';
import { mapState,mapActions } from 'vuex';

export default {
    data() {
      return {
        value: '',
        hotList:["我的天空","光棍节","真的爱你","百鬼夜行","绯色地平线","夜猫","外滩","超级枕头大战","北京交响乐团","天空之城"],
        isLoading: false,
      };
    },
    computed:{
      ...mapState({
        Result:(state) => state.search.Result,
      })
    },
    methods: {
      ...mapActions('search',{
        requestSearch:'requestResultData'
      }),
      onCancel(){
        this.$router.go(-1);
      },
      onRefresh() {
        setTimeout(() => {
          Toast('刷新成功');
          this.isLoading = false;
          this.count++;
        }, 1000);
      },
      put(item){
        // console.log(item);
        this.value = item;
      },
    },  
    watch:{
      //监听value数据的变化，从而请求数据
      value(){
          if(this.value !== ''){ 
            this.requestSearch({search:this.value})
        }
      }  
    }
}
</script>

<style lang="scss" scoped>
#search{position: relative;top: 0;left: 0;}
.title{
  color: #999999;
  font-size: 0.12rem;
  margin: 0.32rem  0 0.25rem 0.15rem;
  width: 0.8rem;
  text-align: left;
}
.hotList{
  width: 1rem;
  height: 0.25rem;
  font-size: 0.12rem;
  border-radius:0.15rem;
  color: #222222;
  text-align: center;
  line-height: 0.25rem;
  border: 0.01rem solid #f3f3f3;
  float: left;
  margin-left: 0.1rem;
  margin: 0 0 0.1rem 0.17rem;
  z-index: 996;
}
.result{
  width: 100%;
  height: auto;
  margin-top: -0.4rem;
  z-index: 999;
  position: absolute;
  background-color: white;
}
.RecommendList{
  width: 100%;
  height: 1.39rem;
  margin-top: 0.05rem;
  margin-bottom: 0.3rem;
  .RecommendList_img{
    width:1.06rem;
    height: 1.39rem;
    border-radius: 0.1rem;
    overflow: hidden;
    float: left;
    margin-left: 0.16rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .RecommendList_right{
    text-align: left;
    width: 2.19rem;
    height: 1.39rem;
    float: left;
    margin-left: 0.1rem;
    position: relative;
    left: 0;
    p{
      margin-bottom: 0.01rem;
    }
    .select{
      display: inline-block;
      width: 0.6rem;
      color: #666666;
      height: 0.18rem;
      border: 0.01rem solid  #d7d7d7;
      border-radius:0.15rem;
      font-size: 0.12rem;
      text-align: center;
      line-height: 0.18rem;
      margin-top: 0.05rem;
    }
    .RecommendList_right_time{
    color: #adadad;
    font-size: 0.12rem;
    }
    .RecommendList_right_place{
      span{
        color: #adadad;
        font-size: 0.12rem;
      }
    }
    .RecommendList_right_bottom{
      width: 100%;
      height: 0.2rem;
      position: absolute;
      bottom: 0;
      .RecommendList_right_price{
        color: deeppink;
        font-size: 0.17rem;
      }
      .qi{
        color: #c7c7cc;
        font-size: 0.12rem;
      }
      .RecommendList_right_rate{
        display: inline-block;
        margin: 0 0.08rem 0 0.57rem ;
      }
    }
  }
}
</style>
<style lang="scss">
.van-search__content{
  background-image:linear-gradient(90deg,#fff3e7,#ffe9f7 51%,#f0f1fe)!important;
  border-radius: 1.33333rem 1.33333rem 1.33333rem 0.02667rem !important;
  height: 0.3rem;
}
.van-rate__icon{
  font-size: 0.12rem;
}
.xize_arrow{
  margin-left: 0.68rem;
  display: inline-block;
}
</style>