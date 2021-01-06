<template>
  <div class="home">
    <div class="home-top">
        <van-button hairline to="/city" id="chose" @click="goCity()">
        {{cityName}}
        </van-button>
        <i class="iconfont icon-daosanjiao" @click="goCity()"></i>
        <span class="sousuokuang" @click="goSearch()"><i class="iconfont icon-sousuo"></i><span>搜索明星、演出比赛、场馆</span></span>
        <router-link to="/mine" class="denglu iconfont icon-lianxiren1-copy" id="touxiang"></router-link>
    </div>
    <div class="category">
      <ul>
          <li v-for="(item,index) in navlist" :key="index" ref="kind" @click="goCategoryList({cityName:cityName,categoryName:item.name})">
            <span :style="{backgroundImage:`url(${item.pic})`}"> </span>
            <p>{{item.name}}</p>
          </li>
      </ul>
    </div>
    <div class="broadcast">
      <!-- <div></div> -->
      <van-image :src="require('../assets/img/bobao.png')" />
      <van-notice-bar left-icon="volume-o" :scrollable="false">
        <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
          <van-swipe-item>德云社哈尔滨首演</van-swipe-item>
          <van-swipe-item>哈姆雷特之伊丽莎白之死</van-swipe-item>
          <van-swipe-item>海贼王话剧集之新世界</van-swipe-item>
          <van-swipe-item>悲惨世界之冉阿让的救赎</van-swipe-item>
          <van-swipe-item>佐助传之地爆天星</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div>
    <div class="recently">近期演出    <span>日历<van-icon name="arrow" /></span></div>

    <van-tabs v-model="active" @click="RequestData">
      <van-tab  v-for="(item,index) in date" :key="index" :title="item.week" :name="item.time">
        <div class="outerwrapper">
          <div class="innerwrapper">          
            <div class="Shows">
              <ul>
                <li v-for="(item,index) in weekList1" :key="index" class="showsList" @click="goPerfomDetail({id:item.performanceId,cityName:item.cityName})">
                    <div class="Shows_img">
                      <img :src="item.verticalPic" alt="">
                    </div>
                    <div class="Show_title">
                        {{item.name}}
                    </div>
                    <p>￥{{item.priceLow}}起</p>
                </li>
              </ul>
            </div>
          </div>
        </div>  
      </van-tab>
    </van-tabs>
   
    <p class="more">更多演出</p>

      <van-dropdown-menu class="Xialas">
        <!-- <van-dropdown-item v-model="value1" title="全部分类" class="Xialas_fenlei"> -->
          <!-- <ul>
            <li v-for="(item,index) in navlist" :key="index" @click="RequestMoreData()">
              {{item.name}}
            </li>
          </ul> -->
        <!-- </van-dropdown-item>   -->
        <van-dropdown-item  :options="options" title="全部分类" v-model="value"  @change="RequestMoreData(value)" />
        <van-dropdown-item v-model="value2" :options="option2" title="全部时间" />
        <van-dropdown-item v-model="value2" :options="option3" title="推荐排序" />
        <van-dropdown-item title="距离最近" disabled  />
      </van-dropdown-menu>

      <ul class="XialasDatas">
          <!-- 此处的样式可以和首页搜索的样式重用 -->
          <li v-for="(item,index) in weekList" :key="index" class="RecommendList" @click="goPerfomDetail({id:item.performanceId,cityName:item.cityName})">
            <div class="RecommendList_img">
                <img :src="item.verticalPic" alt="">
            </div>
            <div class="RecommendList_right">
                  <p class="Name">{{item.name}}</p> 
                  <p class="RecommendList_right_time">{{item.showTime}}</p>
                  <p class="RecommendList_right_place">
                    <span>{{item.cityName}} | </span>
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
      </ul>

    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {NoticeBar,Swipe ,Image as VanImage ,Tab, Tabs ,DropdownMenu, DropdownItem} from 'vant'; 

export default {
  name: 'Home',
  computed:{
    ...mapState({
      navlist:(state) => state.home.navlist,
      weekList:(state) => state.home.weekList,
      weekList1:(state) => state.home.weekList1,
      moreData:(state) => state.detail.recommend,
      options:(state) => state.home.options,
      newDatas:(state) => state.home.newDatas,
    })
  },
  data(){
    return{
        broadcastImg:{ img :'../assets/font/img/bobao.png'},
        cityName:'',
         value1: 0,
          value2: 'a',
          value:'',
          option2: [
            { text: '今天', value: 'a' },
            { text: '最近', value: 'b' },
            { text: '过去一周', value: 'c' },
          ],
          option3:[
            {text:'推荐排序',value:34  },
            {text:'人气排序',value:38  },
            {text:'粉丝排序',value:38  },
          ],
          date:[],
          active:0,
          jia:[
            {img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3307554440,2904768732&fm=26&gp=0.jpg',title:'路飞',name:'万圣节超级狂欢路飞海贼王王者',price:100},
            {img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3307554440,2904768732&fm=26&gp=0.jpg',title:'路飞',name:'万圣节超级狂欢路飞海贼王王者',price:100},
            {img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3307554440,2904768732&fm=26&gp=0.jpg',title:'路飞',name:'万圣节超级狂欢路飞海贼王王者',price:100},
            {img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3307554440,2904768732&fm=26&gp=0.jpg',title:'路飞',name:'万圣节超级狂欢路飞海贼王王者',price:100},
          ]
        };
  },
  methods:{
    ...mapActions('home',{
      requestNav:'requestNavlistData',
      requestWeekData:'requesttweekListData',
    }),
    ...mapActions('detail',{
      requestMoreData:'requestRecommendData',
    }),
    goCategoryList(name){
      this.$router.push({
        name:'category',
        params:name
      });
    },
    goCity(){
      this.$router.push('city');
    },
    goSearch(){
      this.$router.push('search');
    },
    onConfirm(){
      this.$refs.item.toggle();
    },
    //获取首页星期数进行搜索
    getDate(){
      var arr = [];
        for (var i = 0; i < 7; i++) {
            var time = new Date();
            var date = time.getDate();
            time.setDate(date + i);
            // 获取时间
            var year = time.getFullYear();
            var mou = time.getMonth();
            date = time.getDate();
            // 获取周
            var day = time.getUTCDay();
            var da;
            switch (day) {
                case 1:
                    da = '周一';
                    break;
                case 2:
                    da = '周二';
                    break;
                case 3:
                    da = '周三';
                    break;
                case 4:
                    da = '周四';
                    break;
                case 5:
                    da = '周五';
                    break;
                case 6:
                    da = '周六';
                    break;
                case 0:
                    da = '周日';
                    break;
            }
            arr.push({
                week: da,
                time: year + '/' + mou + '/' + date
            })
        }
        this.date = arr;
        console.log(arr);
    },
    //用星期请求数据
    RequestData(name,title){
      // console.log({date:name,page:0});
      this.requestWeekData({date:name,page:0});
    },
    //更多处的请求数据
    RequestMoreData(value){
      this.requestWeekData({categoryName:value});
      // console.log(value);
    },
    //点击进入演出详情页
    goPerfomDetail(item){
          // console.log(item)
          this.$router.push({
            name:'detail',
            params:item
          })
    },
  },
  created(){
    //获得星期
    this.getDate();
    this.requestNav();
    this.requestWeekData();
    this.requestWeekData({date:this.date[0].time});
    //  console.log(this.$route.params.city);
    //做判断：如果this.$route,params不存在，就设置城市为默认值
    if(!this.$route.params.city){
      this.cityName = '全国'
    }
    else{
      this.cityName = this.$route.params.city;
    }     
    this.requestMoreData();
    
  },
  mounted(){
    // console.log(this.$route.path);
  }
}
</script>

<style lang="scss" scoped>
*{margin: 0; padding: 0;}
img{display: block;}
.outerwrapper{
    overflow: hidden;
}
.innerwrapper::-webkit-scrollbar{
    display:none;
}
.innerwrapper{
    // height:100vh;
    left: 0;
    overflow-x:scroll;
    overflow-y: hidden;
}
.Shows{
  width: 1200px;
  height: 190px;
  text-align: left;
  ul{
    width: 100%;
    height: 190px;
    margin-top: 10px;
  }
  // background-color: red;
}
// 近期演出格式
.showsList{
  width:100px;
  height: 190px;
  margin-left: 12px;
  float: left;
  .Shows_img{
    width: 80ox;
    height: 119px;
    border-radius: 8px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
    p{
      display: block;
      z-index: 999;
    }
  }
  .Show_title{
    width:100px;
    // height: 40px;
    height: auto;
    font-size:12px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }    
}
.recently{
  text-align: left;
  margin-left: 17px;
  font-size: 20px;
  width: calc(100% - 17px);
  height: 25px;
  position: relative;
  top: 0;
  span{
    display: inline-block;
    width: 50px;
    height: 17px;
    font-size: 12px;
    border-radius: 10px;
    line-height: 17px;
    // background-color: peru;
    position: absolute;
    border: 1px solid #ededed;
    right: 16px;
    top: 3px;

    text-align: center;
    box-sizing: border-box;
  }
}
//更多演出
.more{
  width: 100%;
  height: 0.35rem;
  text-align: left;
  text-indent: 0.15rem;
  font-size: 0.2rem;
  line-height: 0.35rem;
}
.Xialas{
  height: 0.2rem;
}
.XialasDatas{
  width: 100%;
  height: auto;
  min-height: 3rem;
  margin-top: 0.5rem;
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
#home{
  width: 100%;
  // height: 10rem;
  height: 15rem;
  overflow: auto;
  position: relative;
  top: 0;
  left: 0;
}
.home-top{
  width: 100%;
  height: 0.44rem;
  #touxiang{
    font-size: 0.22rem;
  }
}
.notice-swipe {
    height: 0.4rem;
    line-height: 0.4rem;
    color: black;
    padding-left: 0.1rem;
  }
.sousuokuang{
  display: inline-block;
  width: 2.65rem;
  height: 0.26rem;
  background-image: linear-gradient(90deg,#fff3e7,#ffe9f7 51%,#f0f1fe)!important;
  border: 1px solid rgba(0,0,0,.05)!important;
  border-radius: 1.33333rem 1.33333rem 1.33333rem .02667rem!important;
  margin-left: 0.04rem;
  margin-right: 0.08rem;
  position: relative;
  top: 0.03rem;
  i{
    position: absolute;
    left: 0.1rem;
    top: 0.04rem;
  }
  span{
    font-size: 10px !important;
    margin-top: 0.05rem;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 0.6;
  }
}
.category{
  width: 3.0rem;
  height: 2.3rem;
  margin: 0.27rem auto;
    li{
      width:0.5rem;
      height: 0.6rem;
      float: left;
      margin-right: 0.33rem;
      margin-bottom: 0.2rem;
      span{
        width: 100%;
        height:0.4rem ;
        display: inline-block;
        background-size: auto 100%;
        background-position: center;
        background-repeat: no-repeat;
      }
      p{
        width:100%;
        height: 0.2rem;
        // padding-top: .08rem;
        font-size: 0.12rem;
        color: #666;
      }
    }
    li:nth-of-type(4n){
      margin-right: 0;
    }
    
    
}
//广播部分样式
.broadcast{
  width: 3.33rem;
  height: 0.5rem;
  margin: 0.3rem auto;
  box-shadow: 0 0.04rem 0.16rem 0 rgba(106,122,153,.15);
  border: 0.01rem solid rgba(0,0,0,.15);
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 0.12rem;
  broadcast_right{
    margin-left: 1.2rem;
  }
  .van-image{
    width: 1.1rem;
    height: 0.16rem;
    display: block;
    float: left;
    margin-top: 0.15rem;
    margin-left: 0.1rem;
  }
  .van-notice-bar{
    width: 2rem;
    height: 0.25rem;
    float: left;
    margin-top: 0.1rem;
  }
}
// .notice-swipe van-swipe{
//   padding-left: 0px;
// }
</style>
<style lang="scss">
.van-dropdown-item__content{
  text-align: left;
  li{
    margin: 0.1rem  0 0.18rem 0.15rem;
  }
}
</style>