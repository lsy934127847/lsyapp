<template>
    <div>
        <div id="category">
            <van-tabs @click="Searchshow" v-model="checked">
                <!-- 下拉控件 -->
                <van-dropdown-menu>
                    <van-dropdown-item v-model="value1" title="全国" >
                      <div class="location">
                          <p>定位城市</p>
                          <div><span>定位失败</span></div>
                      </div>
                      <p class="hotList">热门城市/区域</p>
                      <div class="hotcity">
                          <ul>
                              <li v-for="(item,index) in hotcity" :key="index" @click="ChooseCity({city:item.name})">{{item.name}}</li>
                          </ul>
                      </div> 

                      <div class="outer-container">
                          <div class="inner-container">
                              <template v-for="(item ,key, index) in city">
                                  <van-index-anchor :index="key" :key="index" id="zimu"/>
                                  <van-cell v-for="(subItem , index) in item" :title="subItem.name" :key="index" @click="ChooseCity({city:subItem.name})" id="citieslist"/>
                              </template>
                          </div>
                      </div> 
              </van-dropdown-item>  

                    <van-dropdown-item v-model="value1" title="全部时间" @change="Onchange">
                        <!-- 日历 -->
                        <van-cell title="选择单个日期" :value="date" @click="show = true" />
                        <van-calendar v-model="show" @confirm="onConfirm2" position="top"/>

                    </van-dropdown-item>  
                    <van-dropdown-item v-model="value2" :options="option2" />
                    <van-dropdown-item title="距离最近" disabled  />
                </van-dropdown-menu>
                <van-tab v-for="item in guides" :key="item.categoryName" :title="item.categoryName" :name="item.categoryName">
                    <!-- 商品列表 -->
                    <div class="shoplist">
                        <ul>
                        <!-- 此处的样式可以和首页搜索的样式重用 -->
                        <li v-for="(item,index) in recommend" :key="index" class="RecommendList" @click="goPerfomDetail({id:item.performanceId,cityName:item.cityName})">
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
                    </div>

                </van-tab>
            </van-tabs>
        </div>
        <router-view/>
    </div>    
</template>

<script>
import { mapState,mapActions } from 'vuex';
import { Tab, Tabs ,DropdownMenu, DropdownItem , Rate ,Calendar, Col,Cell,IndexBar,IndexAnchor} from 'vant';
// import city from '../components/Category_City';
// import calendar from '../components/Calendar';

export default {
    name:'category',
    components:{
      // choseCity:city,
      // choseTime:calendar,
    },
    data(){
        return{
            value1: 0,
            value2: 'a',
            option1: [
                { text: '全部商品', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 },
            ],
            option2: [
                { text: '推荐排序', value: 'a' },
                { text: '最新上架', value: 'b' },
                { text: '最近开场', value: 'c' },
            ],
            //分类页所接收到的首页传送过来的数据
            params:{},
            //选中的标签页名字
            checked:'',
            // checkeds:6,
            //控制日历显示
            date: '',
            show: true,
            param:{
              categoryName:'',
              cityName:'',
              date:''
            }
        }
    },
    computed:{
        ...mapState({
            guides:(state) => state.category.navigationList,
            recommend:(state) => state.category.Recommend,
            recommends:(state) => state.home.weekList,
            hotcity:(state) => state.city.hotcity,
            city:(state) => state.city.cityall,

        })
    },
    methods: {
        ...mapActions('category',{
            requestGuides:'requestnavigationListData',
            requestRecommend:'requestRecommendData',
        }),
        ...mapActions('home',{
            requestCategoryData:'requesttweekListData',
        }),
        ...mapActions('city',{
            requestHotcity:'requestHotcityData',
            requestCity:'requestCityData',
        }),
        Searchshow(name,title){
          this.param.categoryName = this.checked;
          // console.log(this.param,this.checked);
          this.requestRecommend(this.param);
        },
        clickCity(){
          this.$refs.mycity.ChooseCity(city);
        },
        goPerfomDetail(item){
          console.log(item)
          this.$router.push({
            name:'detail',
            params:item
          })
        },
        onConfirm(){
          this.$refs.mycity.toggle();
        },
        onChoseTime(){
          this.value = !this.value;
          this.$refs.mytime.toggle();
        },
        formatDate(date) {
            return `${date.getMonth() + 1}/${date.getDate()}`;
        },
        onConfirm2(date) {
            this.show = false;
            this.date = this.formatDate(date);
            var myDate = new Date();
            var tYear = myDate.getFullYear();
            this.date = tYear + "/" + this.date;
            this.requestRecommend(this.date);
        },
        Onchange(val){
          // console.log(val)
        },
        //点击城市请求数据
        ChooseCity(city){
          // console.log(city);
          this.param.cityName = city.city;
          // console.log(this.param);
          this.requestRecommend(this.param);
        }
     
    },  
    filters:{
        demonFn(value){
        return value = value / 2;
        }
    },
    created(){
        this.requestGuides();
        this.param.categoryName=this.$route.params.categoryName;
        this.requestRecommend(this.param);
        this.checked = this.param.categoryName;
        this.requestHotcity();
        this.requestCity();
    },
    watch:{
      value1(){
        // console.log(this.value1)
      }
    }
}
</script>

<style lang="scss" scoped>
*{margin: 0; padding: 0;}
img{display: block;}
// 城市
.location{
    width: 100%;
    height: 0.75rem;
    p{
        width: 100%;
        height: 0.25rem;
        background-color: #f2f3f4;
        text-align: left;
        text-indent:0.08rem ;
        font-size: 0.13rem;
        line-height:0.25rem ;
    }
    div{
        width: 100%;
        height: 0.5rem;
        span{
            display: block;
            width: 1.05rem;
            height: 0.36rem;
            margin: 0.05rem 0 0 0.13rem;
            text-align: center;
            line-height: 0.38rem;
            border: 0.01rem solid #e7e7e7;
            font-size: 0.13rem;
        }
    }
}
.hotcity{
    width: 100%;
    height: 2.12rem;
    li{
        width: 1.05rem;
        height: 0.36rem;
        margin:0.11rem 0 0 0.12rem;
        border: 0.01rem solid #e7e7e7;
        text-align: center;
        font-size: 0.13rem;
        float: left;
        line-height: 0.36rem;
    }
}

.hotList{
        width: 100%;
        height: 0.25rem;
        background-color: #f2f3f4;
        text-align: left;
        text-indent:0.08rem ;
        font-size: 0.13rem;
        line-height: 0.25rem;
}
#zimu{
    background-color: #f2f3f4;
    text-align: left;
}
#citieslist{
    text-align: left;
    text-indent: 0.14rem;
    margin-top: 0.1rem;
}


.shoplist{
    width: 100%;
    height: auto;
    //    height: 700px;
    // height: 100%;
    overflow:auto;
    position: relative;
    left: 0;
    ul{
    width: 100%;
    height: auto;
    margin-top: 0.41rem;
  }
}
.RecommendList{
  width: 100%;
  height: 1.39rem;
  margin-top: 0.05rem;
  margin-bottom: 0.3rem;
  .RecommendList_img{
    width:1rem;
    height: 1.39rem;
    border-radius: 0.1rem;
    overflow: hidden;
    float: left;
    margin-left: 0.18rem;
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
    margin-left: 0.16rem;
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
.list{
    width: calc(100% - 0.3rem);
    height: calc(1.88rem - 0.3rem);
    padding: 0.15rem;
    img{
        width: 1.05rem;
        height: 1.5rem;
        // font-size: 0;
        border-radius: 0.07rem;
        overflow: hidden;
        position: relative;
        float: left;
    }
    .right{
        width: 2.26rem;
        height: 1.3rem;
        float: left;
        margin-left: 0.12rem;
        text-align: left;
        position: relative;
        left: 0;
        p{
            font-size: 0.12rem;
            color: #aaaaaa;
        }
        p:nth-of-type(1){
            font-size: 0.18rem;
            color: black;
            margin-bottom: 0.08rem;
        }
        p:nth-of-type(4){
            margin-left:0 ;
            margin-bottom: 0;
            margin-top: 0.2rem;
        }
        div{
            display: block;
            position:absolute;
            bottom: 0;
            width: 100%;
            height: 0.3rem;
            font-size: 0.12rem;
            color: #aaaaaa;
            span{
                display: inline-block;
                color: deeppink;
                font-size: 0.17rem;
            }

        }
    }
}
</style>
<style lang="scss">
.van-rate__icon{
  font-size: 0.12rem;
}
.xize_arrow{
  margin-left: 0.68rem;
  display: inline-block;
}
</style>
