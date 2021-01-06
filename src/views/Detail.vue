<template>
      <div class="detail">
          <div class="detailShow">
              <div class="head">
                <img :src="detailLists.verticalPic" alt="">
                <div class="right">
                  <span>【{{detailLists.cityName}}】  {{detailLists.name}}</span>
                  <p>{{detailLists.type}}</p>
                  <div class="price" v-if="detailLists.priceList">￥{{detailLists.priceList[0].price}}-￥{{detailLists.priceList[1].price}}</div>
                </div>
              </div>
              <!-- 演出站点 -->
              <div class="outerwrapper">
                <div class="innerwrapper">
                  <div class="showstation">
                    <ul>
                      <li v-for="(item,index) in detailList.station" :key="index">
                          <p>{{item.where}}</p>
                          <p>{{item.time}}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>    

              <!-- 服务说明 -->
              <div class="xize"  @click="showFuwu()" >
                <span  class="iconfont icon-cha">
                不支持退
                </span>
                <span  v-show="detailLists.isEticket === true"  class="iconfont icon-gou">电子票</span>
                <span  v-show="detailLists.isAotu === true"  class="iconfont icon-gou">自助取票</span>
                <span  v-show="detailLists.isEticket === false"  class="iconfont icon-gou">纸质发票</span>
                <span  v-show="detailLists.isSelectSeat === true"  class="iconfont icon-gou">可选座</span>
                    <van-icon name="arrow"  class="xize_arrow"/>
              </div>
              <!-- 服务弹出窗 -->
              <van-popup v-model="show3" round position="bottom" :style="{ height: '70%' }" closeable class="pop">
                        <ul>
                          <span>场次</span>
                          <span>场次事件均为演出当地时间</span>
                          <li v-for="(item,index) in ServeData" :key="index">
                            <p>{{item.title}}</p>
                            <p>{{item.content}}</p>
                          </li>
                        </ul>
              </van-popup>  

              <!-- 场次/演出时长信息 -->
              <van-cell :title="detailLists.showTime" is-link size="large" label="以现场为准"  class="concreteTime" @click="showSeat()"/>
              <!-- 场次选座购买弹出窗 -->
              <van-popup v-model="show" round position="bottom" :style="{ height: '70%' }" closeable >
                        <ul class="Sessions">
                          <span class="session">场次</span>
                          <span class="session_time">场次事件均为演出当地时间</span>
                          <li v-for="(item,index) in detailLists.performBases" :key="index">
                            <p @click="Putchang(item)" :class="{active:item === set }">{{item.sellTime}}</p>
                          </li>
                        </ul>
                         <!-- 票档  -->
                        <div class="PriceLists">
                          <p>票档</p>
                          <ul>
                            <li v-for="(item,index) in detailLists.priceList" :key="index" @click="Putprice(item.price,item)" :class="{active:item.price === PricE }">
                              {{item.site}} {{item.price}}元
                            </li>
                          </ul>
                        </div>
                        <!-- 购买数量 -->
                        <div class="purchase">
                          <span>数量</span><span>每笔订单限购2张</span>
                          <van-stepper v-model="items" theme="round" button-size="22" disable-input min="1" max="2" @change="changeItem()"/>
                        </div>
                        <!-- 优惠券&优惠券弹出框 -->
                        <van-cell title="优惠说明" is-link size="large" class="discount iconfont icon-hui" @click="showDiscount()"/>
                          <van-popup v-model="show2" round position="bottom" :style="{ height: '70%' }" closeable  class="DiscountCoupon">
                            <p>优惠说明</p>
                            <p>说明：您选购优惠票档所对应的票品种类可能为套票、优惠票等类型，具体以您收到的票面信息标示为准。实际优惠情况以订单确认页为准。</p>
                            <div class="coupon">
                              <span class="coupon_left iconfont icon-huangguan"></span>
                              <span class="coupon_center" v-if="detailLists.performBases">
                                {{detailLists.performBases[0].marketingStall.mainText}}
                              </span>
                              <span class="coupon_right" @click="Get()">立即领取</span>
                            </div>
                          </van-popup>
                        <!-- 购买框   -->
                        <div class="Certain" @click="Confirm()">
                          <span>总金额：￥{{Totalprice}} </span>
                          <span @click="Shopping()">确定</span>
                        </div>
                        
              </van-popup>  


              <van-cell :title="detailLists.cityName" is-link size="large" :label="detailLists.venueName"  class="map">
                  <template #right-icon>
                    <van-icon name="home-o" class="search-icon" />
                  </template>
              </van-cell>
              <!-- 条形分隔线 -->
              <div class="separate"></div>
              <!-- 演唱会周榜 -->
              <van-cell title="演唱会周榜NO.1" class="iconfont icon-xunzhang rank">
                <template #right-icon>
                  <van-icon name="tv-o" class="search-icon" />
                </template>
              </van-cell>
              <!-- 条形分隔线 -->
              <div class="separate"></div>
              <!-- VIP优惠券 -->
              <van-cell value="立即开通" is-link class="VIP">
                <template #title>
                  <van-icon class="iconfont icon-VIP" />
                  <span class="custom-title">含400元演出红包</span>
                </template>
              </van-cell>
              <!-- 条形分隔线 -->
              <div class="separate"></div>
              <!-- 详情、评价、须知、推荐 -->
              <van-tabs v-model="activeName" @click="goAction()">
                <van-tab title="详情" name="a">
                  <span @click="goTo()">演职人员</span>
                    <div class="outerwrapper">
                      <div class="innerwrapper">
                    <!-- 演职人员 -->
                          <div class="singers">
                                <ul>
                                  <li v-for="(item,index) in detailLists.artists" :key="index" @click="goTo()">
                                      <div class="phone"><img :src="item.picUrl" alt=""></div>
                                      <div class="tags">
                                        <span class="iconfont icon-daV"></span>
                                        <span>{{item.tag}}</span>
                                      </div>
                                      <span class="names">{{item.artistsName}}</span>
                                      <p class="introduce">{{item.archives}}</p>
                                  </li>
                                </ul>
                          </div>
                      </div>   
                    </div>
                    <!-- 演出介绍   -->
                    <div class="introduces">
                       <h4>演出介绍</h4>
                      <p v-if="detailLists.introduce">【{{detailLists.introduce[0].title}}】</p>
                      <p v-if="detailLists.introduce">{{detailLists.introduce[0].context}}</p>
                      <ul v-if="detailLists.introduce">
                          <li v-for="(item,index) in detailLists.introduce[0].imgPicUrl" :key="index" >
                              <img :src="item" alt="">
                          </li>
                      </ul>
                    </div>

                </van-tab>

                <van-tab title="评论" name="b" class="Evaluate">
                  <h4>观众热评({{total}})</h4>
                  <ul>
                      <li v-for="(item,index) in  evaluste" :key="index" class="EvaluateList">
                        <div class="EvaluateList_1">
                            <div class="EvaluateList_1_img"><img :src="item.imgUrl" alt=""></div>
                            <div class="EvaluateList_1_id"> 
                              <h5>{{item.nickName}}</h5>
                              <p class="EvaluateList_1_id_time">{{chatTime(item.date)}}</p>
                            </div>
                            <div class="EvaluateList_1_rank">
                              <h5>{{item.score | gradeFn}}</h5>
                              <van-rate v-model="item.score" readonly class="xingxing"  color="#ff9747"/>
                            </div>
                        </div>
                        <div class="EvaluateList_2">
                          {{item.comment}}
                        </div>
                        <div class="EvaluateList_3">
                          <span v-for="(item,index) in item.picUrlList" :key="index"><img :src="item" alt=""></span>
                        </div>  
                        <div class="EvaluateList_4">
                              <span class="EvaluateList_4_time">{{item.date}}</span>
                              <!-- <span class="EvaluateList_4_evalusteNumber iconfont icon-xiaoxi">{{item.evalusteNumber}}</span> -->
                              <span class="EvaluateList_4_evalusteNumber">
                                <span class="iconfont icon-xiaoxi tubiao"></span>
                                {{item.evalusteNumber}}
                              </span>
                              <span class="EvaluateList_4_likeNumber">
                                <span class="iconfont icon-zan tubiao"></span>
                                {{item.likeNumber}}
                              </span>
                        </div>

                      </li>

                  </ul>
                </van-tab>

                <van-tab title="须知" name="c" class="inform">
                  <!-- 购票须知 -->
                  <span class="bigTitle">购票须知</span>
                  <van-cell-group v-for="(item,index) in BuyNotice_3" :key="index">
                    <van-cell :title="item.title" :label="item.content"/>
                  </van-cell-group>
                    <!-- 购票弹窗 -->
                  <van-cell is-link @click="showBuy">查看所有的购票须知</van-cell>
                      <van-popup v-model="show" round position="bottom" :style="{ height: '70%' }"  closeable class="pop">
                          <span class="bigTitle">购票须知</span>

                          <van-cell-group v-for="(item,index) in notice_Buy" :key="index" >
                            <van-cell :title="item.title" :label="item.content"/>
                          </van-cell-group>
                      </van-popup>  
                  <!-- 条形分隔线 -->
                  <div class="separate"></div>

                  <!-- 观影须知 -->
                  <span class="bigTitle">观影须知</span>
                  <van-cell-group v-for="(item,index) in WatchNotice_3" :key="index">
                    <van-cell :title="item.title" :label="item.content"/>
                  </van-cell-group>
                   <van-cell is-link @click="showWatch">查看所有的观影须知</van-cell>
                      <van-popup v-model="show1" round position="bottom" :style="{ height: '70%' }" closeable class="pop">

                          <span class="bigTitle">观影须知</span>
                          <van-cell-group v-for="(item,index) in notice_Watch" :key="index">
                            <van-cell :title="item.title" :label="item.content"/>
                          </van-cell-group>
                      </van-popup>  

                </van-tab> 

                <van-tab title="推荐" name="d" class="recommend">
                      <h4>为你推荐</h4>
                      <ul>
                        <!-- 此处的样式可以和首页搜索的样式重用 -->
                        <li v-for="(item,index) in recommend" :key="index" class="RecommendList">
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
                </van-tab>

              </van-tabs>

              <!-- 底部导航栏 -->
              <ul class="BottomNav">
                <li @click="goHome()">
                  <p><van-icon name="wap-home-o" class="shouye"/></p>
                  <p>大麦首页</p>
                </li>
                <li>
                  <p class="hongxin iconfont icon-xiangkan"></p>
                  <p>想看</p>
                </li>
                <li @click="goOrders()">
                  <p class="dingdan iconfont icon-order-"></p>
                  <p>我的订单</p>
                </li>
                <li  @click="showSeat()">立即购买</li>
              </ul>

          </div>
      </div>    
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Cell, CellGroup , Stepper, ShareSheet,Toast ,Tab, Tabs ,Popup, Rate,Lazyload } from 'vant';
export default {
  data(){
    return{
      //详情页商品数据
      detailList:
        {
          station:[
            {where:"西安站",time:"2020.10.31-11.01"},
            {where:"重庆站",time:"2020.10.31-11.01"},
            {where:"陵水站",time:"2020.10.31-11.01"},
            {where:"清水站",time:"2020.10.31-11.01"},
            {where:"河水站",time:"2020.10.31-11.01"},
          ]
        },
      showShare: true,
      //评论&详情&分页部分的数据
      kind:[
        {title:'详情',content:'内容1',name:'a'},
        {title:'须知',content:'内容2',name:'b'},
        {title:'推荐',content:'内容3',name:'c'},
        {title:'评价',content:'内容4',name:'d'},
      ],
      //默认处于激活状态的栏
      activeName: 'a',
      //查看所有购票信息的数据
      show:false,
      show1:false,
      show2:false,
      show3:false,
      //单个详情页里的根据id产生的单个演出数据
      Detail:[{
        isEticket:true,isSelectSeat:true,isAotu:true
      }],
      //路由参数
      params:'',
      //歌手id数组，用于获取歌手信息
      Singer:[],
      //确定购买页的价格
      price:'',
      //立即领取优惠券
      receive:false,
      //购买处的数量
      items:1,
      //场次
      set:'',
      //价格/票档
      PricE:'',
      //购买后的价格变动
      totals:'',
      //请求评论所需的值
      ids:'',
      //添加订单
      orders:{},
      //票档
      dang:'',
    }
  },
  // 数据过滤器
  filters:{
    //评分判定等级的过滤器
    gradeFn(value){
      value = value / 2;
      var ranking;
      if(value>=4 && value<=5){
        ranking = '极好';
      }else if(value>=3 && value<=4){
        ranking = '推荐';
      }else if(value>=2 && value<=3){
        ranking = '一般';
      }else if(value>=1 && value<=2){
        ranking = '较差';
      }else if(value>=0 && value<=1){
        ranking = '不推荐';
      }
      return ranking ;
    },
    //星星评分的过滤器
    starFn(value){
      value = value / 2 ;
      return value;
    }
  },
  methods:{
    goAction(name, title) {
      // Toast(title);
    },
    goTo(){
      alert('111');
    },
    showFuwu(){
      this.show3 = true; 
    },
    showBuy(){
      this.show = true;
    },
    showWatch(){
      this.show1 = true;
    },
    showSeat(){
      this.show = true;
    },
    showDiscount(){
      this.show2 = true;
    },
    Putprice(price,dang){
      this.price = price;
      this.dang = dang;
      this.price = PricE;
      // console.log(this.price);
    },
    goHome(){
      this.$router.push({
        name:'home'
      });
    },
    Putchang(item){
      this.set = item;
      // console.log(this.set);
    },
    goOrders(){
      this.$router.push({
        name:'ordersAll'
      })
    },
    //确定购买数量，并计算价格
    changeItem(){
      this.totals = this.items * this.price ;
    },
    //领取优惠券
    Get(){
      // Toast.success('领取成功！');
      Toast.success({
        message:'领取成功！',
        position:'bottom',
      }),
      this.receive = true;
    },
    //确认购买
    Confirm(){
      // console.log(this.userId,this.set,this.price,this.totals,this.items);
      var params01={};
      params01.userId = this.userId;
      params01.sets = this.set;
      params01.dang = this.dang;
      params01.totals = this.totals;
      params01.items = this.items;
      // console.log(params01);
      // 把所需要的数据发送给订单栏
      if(!this.Totalprice){
          Toast.fail('请选择商品！');
      }
      else{
          Toast.success('购买成功！');
          this.$router.push({
            name:'orders',
            params:params01
          })
      }
    },
    //数据请求 
    ...mapActions('detail',{
      requestDetail:'requestDetailListData',
      requestEvaluste:'requestEvalustetData',
      requestNotice:'requestNoticeData',
      requestRecommend:'requestRecommendData',
    }),
    change(){
      this.params = this.$route.params;
      this.requestDetail(this.params);
      // console.log(this.params);
      // this.ids = this.params.slice(0,1);
      // console.log({performanceId:this.params.id});
      this.requestEvaluste({performanceId:this.params.id});
      // console.log({cityId:this.detailLists.cityId});
      // console.log(this.params.cityName);
      this.requestRecommend({cityName:this.params.cityName});
    },

    Shopping(){
      // console.log(this.detailLists.cityName,this.totals,this.items);
    }
  },
  computed:{
    ...mapState({
      detailLists:(state) => state.detail.detailLists,
      evaluste:(state) => state.detail.evaluste,
      BuyNotice_3:(state) => state.detail.BuyNotice_3,
      WatchNotice_3:(state) => state.detail.WatchNotice_3,
      notice_Buy:(state) => state.detail.notice_Buy,
      notice_Watch:(state) => state.detail.notice_Watch,
      recommend:(state) => state.detail.recommend,
      ServeData:(state) => state.detail.ServeData,
      userId:(state) => state.userId,
    }),
    total:function(){
      var adds;
      adds = this.evaluste.length;
      return adds;
    },
    Totalprice:function(){
        var totalList = this.items * this.price;
        // console.log(this.price,this.items)
        if(this.receive == true){
          if(this.detailLists.performBases[0].marketingStall.type == 1 && totalList >= 300 && totalList <500){
              totalList = totalList - 30;
          }else if(this.detailLists.performBases[0].marketingStall.type == 2 && totalList >=500){
              totalList = totalList - 50;
          }else if(this.detailLists.performBases[0].marketingStall.type == 3 && this.items == 2){
              totalList = totalList * 0.9;
          }else if(this.detailLists.performBases[0].marketingStall.type == 4 && this.items == 2){
              totalList = totalList * 0.8;
          };
        }
         return totalList;
    },
    chatTime(){
        return function(val){
            let date=new Date(val);
            let year=date.getFullYear();
            let month=(date.getMonth()+1<10?('0'+(date.getMonth()+1)):date.getMonth()+1);
            let day=(date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
            let hours=(date.getHours() < 10 ? '0'+date.getHours() : date.getHours());
            let min=(date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
            let sec=(date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
            //返回格式为 yyyy-xx-dd hh:mm:ss
            return `${year}-${month}-${day} ${hours}:${min}:${sec}`;
            //返回格式为2020年11月10日 21时21分21秒
            //return `${year}年${month}月${day}日 ${hours}时${min}21${sec}秒`;
         }
    }     
  },  
  created(){
    // this.params = this.$route.params;
    // console.log(this.params);
    // this.Singer = detailLists.
    // this.requestDetail(this.params);
    this.change();
    this.requestNotice();
  },
  watch:{
    $route(){
      this.change()
    },
    changeItem(){
      this.totals = this.items * this.price ;
    },

  },
  mounted(){
    // setTimeout(
    //   this.requestDetail(this.params)
    // ,1)
  }
}
</script>

<style lang="scss" scoped>
// 滚动条隐藏
html,body{
    width: 100vw;
    height: 100vh;
}
.detail{width:100%;height:auto ;overflow: auto;z-index:998;background-color: pink;position: relative; }
img{display: block;}
//底部导航栏
.BottomNav{
  width: 100%;
  height: 0.6rem;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  color: #999999;
  li{
    width: 0.6rem;
    height: 0.4rem;
    float: left;
    font-size:0.12rem;
    margin:0.1rem auto;
    text-align: center;
  }
  li:nth-of-type(4){
    width: 1.65rem;
    height: 0.4rem;
    font-size: 0.15rem;
    background-color: deeppink;
    color: white;
    border-radius: 0.3rem;
    overflow: hidden;
    margin: 0.07rem 0.08rem 0 0.15rem;
    text-align: center;
    line-height: 0.4rem;
  }
}
//小图标样式重置
.hongxin{
  font-size: 0.18rem;
}
.dingdan{
  font-size: 0.18rem;
} 
.detailShow{
    width: 100%;
    height: 7rem; 
    overflow:auto;
    background-color: white;
    margin-top: 0.13rem;
    padding-top: 0.15rem;
    border-radius: 0.13rem 0.13rem 0 0;
    box-sizing: border-box;
    .head{
      width: 100%;
      height: 1.53rem;
      position: relative;
      left: 0;
      img{
        width: 1.05rem;
        height: 1.53rem;
        margin-left:0.11rem;
        float: left;
        border-radius: 0.08rem;
      }
      .right{
        width: 2.3rem;
        height: 1.53rem;
        float: left;
        margin-left: 0.09rem;
        font-size: 0.17rem;
        font-weight: 600;
        text-align: left;
        .price{
          width: 2.3rem;
          height: 0.15rem;
          position:absolute;
          bottom: 0.05rem;
          text-align: left;
          font-size: 0.18rem;
          color: deeppink;
        }
      }
      p{
        width: 0.38rem;
        height: 0.15rem;
        border: 0.01rem solid pink;
        color:#ff6e00;
        font-size: 0.1rem;
      }
      
    }
}
//场次选座购买样式
.Sessions{
  width: 100%;
  height: auto;
  margin-top: 0.15rem;
  text-align: left;
  span{
    display: inline-block;
    margin: 0.26rem 0 0.15rem 0.23rem;
  }
  span:nth-of-type(2){
    color: #b8b8be;
    font-size: 0.12rem;
    margin-left: 0.05rem;
  }
  li{
    width: 2rem;
    height: 0.4rem;
    background-color: red;
    margin:0.15rem 0 0 0.2rem;
    border-radius: 0.09rem;
    color: #999999;
    background-color: #f6f7f8;
    text-align: center;
    line-height: 0.4rem;
    border: 0.01rem solid #e9eaeb;
  }
}
//选中的样式
.active{
  color: deeppink;
  border: 1px solid red;
}
//选座购买中的优惠券
.discount{
  color: #ff8a32;
  background-color: #fff0e5;
  text-align: left;
  width: 3.3rem;
  border-radius: 0.08rem;
  margin: 0.1rem 0 0.16rem 0.2rem;
  span{
    margin-left: 0.02rem;
    font-size: 0.15rem;
  }
  i{
    color: #ff8a32;
  }
}
//确定购买框
.Certain{
  width: 3.3rem;
  height: 0.5rem;
  margin: 0 auto;
  // background-color: red;
  span:nth-of-type(1){
    width:1.3rem;
    height: 0.4rem;
    margin: 0.05rem 0.1rem 0 0.1rem;
    display: inline-block;
  }
  span:nth-of-type(2){
    width: 1.5rem;
    height: 0.4rem;
    display: inline-block;
    margin: 0.05rem 0 0.05rem 0.15rem;
    color: white;
    background-image: linear-gradient(90deg,#ff3299 1%,#ff4a72);
    border-radius: .58667rem .58667rem .58667rem .05333rem;
    opacity: 0.6;
    text-align: center;
    line-height: 0.4rem;
  }
}
//优惠券中的优惠说明
.DiscountCoupon{
  text-align: left;
  font-size: 0.2rem;
  p{
    width: 1.3rem;
    margin:0.2rem 0 0.32rem 0.21rem;
  }
  p:nth-of-type(2){
    width:3.34rem;
    height: 0.75rem;
    color: #9c9ca5;
    font-size:0.15rem;
  }
  // 优惠券
  .coupon{
    width: 3.34rem;
    height: 0.8rem;
    margin: 0 auto;
    box-shadow:0.02rem 0.02rem 0.05rem #000;
    border-radius: 0.1rem;
    .coupon_left{
      width: 0.73rem;
      height: 0.8rem;
      background-color: #ffffff;
      text-align: center;
      color: #e7c09f;
      display: block;
      border-radius: 0.1rem;
      border: 0.01rem solid white;
      border-right: 0.01rem double #e4e7ed;
      box-sizing: border-box;
      line-height: 0.8rem;
      font-size: 0.29rem;
      margin-right: 0.12rem;
      float: left;
      overflow: hidden;
    }
    .coupon_center{
      display:block;
      font-size: 0.16rem;
      font-weight: 550;
      width: 1.5rem;
      height: 0.8rem;
      float: left;
      line-height: 0.8rem;
      text-indent: 0.1rem;
    }
    .coupon_right{
      display: block;
      float: left;
      line-height: 0.25rem;
      height: 0.25rem;
      width: 0.78rem;
      font-size: 0.12rem;
      background-color: #000000;
      color: #cea072;
      text-align: center;
      border-radius: 0.15rem;
      margin:0.29rem 0 0 0.02rem;

    }
  }
}
//票档
.PriceLists{
  width: 100%;
  height: auto;
  p{
    width: 1rem;
    height: 0.2rem;
    margin: 0.26rem 0 0.15rem 0.23rem;
    text-align: left;
  }
  ul{
    width: 100%;
    margin-top: 0.15rem;
    li{
      width: 2rem;
      height: 0.35rem;
      background-color: #f6f7f8;
      border-radius: 0.06rem;
      margin: 0 0 0.13rem 0.23rem;
      text-align: center;
      line-height: 0.35rem;
      color: #666666;
    }
    li:hover{
      border: 0.01rem solid red;
      color: deeppink;
    }
  }
}
//购买数量
.purchase{
  width: 100%;
  height: auto;
  text-align: left;
  margin-top: 0.2rem;
  span:nth-of-type(1){
    display: inline-block;
    width: 0.4rem;
    height: 0.2rem;
    margin:0.1rem 0 0.05rem 0.23rem;
  }
  span:nth-of-type(2){
    display: inline-block;
    width: 1.5rem;
    height: 0.2rem;
    margin:0.1rem 0 0.05rem 0rem;
    color: #9c9ca5;
    font-size: 0.11rem;
  }
}
//分隔线样式
.separate{
  width: 100%;
  height: 0.12rem;
  background-color: #f8f8f8;
}
//周榜样式
.rank{
  width: 100%;
  height: 0.37rem;
  color: red;
  line-height: 0.12rem;
  .van-cell__title{
    text-align: left;
    text-indent: 0.09rem;
    color: black;
  }
  .search-icon{
    color: black;
  }
}
//演出站点样式
.showstation{
  // width: calc(100% - 0.22rem);
  width: 10rem;
  // width:auto ;
  height:0.78rem;
  background-color: white;
  padding: 0.11rem ;
  li{
    width: 1.05rem;
    height: 0.52rem;
    border-radius: 0.1rem;
    float: left;
    margin-left: 0.06rem;
    background-color:#f7f7f7 ;
    border: 0.01rem solid transparent;
    text-align: center;
    padding-top: 0.15rem;
    p:nth-of-type(2){
      font-size: 0.1rem;
      color: #a89cb7;
    }
  }
  li:nth-of-type(1){
    margin-left: 0;
  }
  li:hover{
    border: 0.01rem solid deeppink;
    color: #ff5456 !important;
  }
}
// VIP优惠券
.VIP{
  width: 100%;
  height: 0.5rem;
  text-align: left;
  color: 	#ba8158;
  span{
    margin-left: 0.09rem;
    color: black;
  }
  .van-cell__value>span{
    color: #9c9ca5;
    font-size: 0.13rem;
  }

}
//演职人员样式
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
.singers{
  width:18rem;
  // width: auto;
  height: 1.4rem;
  // background-color: red;
  li{
    width: 1rem;
    height: 1.4rem;
    float: left;
    margin-left: 0.13rem;
    position: relative;
    .phone{
      width: 0.65rem;
      height: 0.65rem;
      border: 0.01rem solid transparent;
      box-sizing: border-box;
      overflow: hidden;
      margin: 0 auto;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
      }
    }  
    .tags{
      width: 0.5rem;
      height: 0.17rem;
      position: absolute;
      top: 0.47rem;
      left: 0.24rem;
      background-color: black;
      border-radius:0.15rem ;
      span:nth-of-type(1){
        display: inline-block;
        font-size: 0.13rem;
        color: yellow;
      }
      span:nth-of-type(2){
        display: inline-block;
        font-size: 0.13rem;
        color: white;
        margin-left: 0.03rem;
      }
    }  
    .names{
      display: inline-block;
      width: 1rem;
      height: 0.2rem;
      margin-top: 0.1rem;
      text-align: center;
      font-weight: 550;
    }
    .introduce{
      width: 1rem;
      white-space: nowrap;         
      text-overflow: ellipsis;
      font-size: 0.12rem;
      color: #9c9ca5;
      overflow:hidden;
    }
  }
}
//演出介绍样式
.introduces{
  width: 100%;
  // height: 500px;
  height: auto;
  // background-color: red;
  text-align: left;
  font-weight: 550;
  h4{
    margin-left: 0.12rem;
  }
  p{
    width: 90vw;
    margin:0.15rem 0 0.14rem 0.14rem;
  }
  p:nth-of-type(1){
    margin-left: 0.07rem;
  }
  p:nth-of-type(2){
    color: #888e8f;
    font-size: 0.12rem;
  }
  li{
    width: 100%;
    height:auto ;
    margin: 0 auto;
    margin-top: 0.07rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  // li:nth-of-type()
}
//购票须知样式
.inform{
  width: 100%;
  height: auto;
  text-align: left;
  .bigTitle{
    display: block;
    font-weight: 600;
    text-indent: 0.14rem;
  }
  .lookAll{
    text-align: center;
    color: #30aeff;
  }
}
//评价
.Evaluate{
  text-align: left;
  text-indent: 0.1rem;
}
//评论列表
.EvaluateList{
  width: calc(100% - 0.2rem);
  height: 2.75rem;
  // height: auto;
  padding: 0.06rem;
  .EvaluateList_1{
    width: 100%;
    height: 0.42rem;
    margin-top: 0.15rem;
    background-color: white;
    .EvaluateList_1_img{
      width: 0.45rem;
      height: 0.42rem;
      border-radius: 50%;
      overflow: hidden;
      float: left;
      margin-right: 0.09rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .EvaluateList_1_id{
      width: 1.4rem;
      height: 0.42rem;
      float: left;
      text-align: left;
      text-indent: 0;
      h5{
        margin-top: 0.05rem;
        font-weight: 550;
      }
      .EvaluateList_1_id_time{
        font-size: 0.12rem;
        color: #a69999;
        margin-top: 0.02rem;
      }
    }
    .EvaluateList_1_rank{
      width: 1.05rem;
      height: 0.42rem;
      overflow: hidden;
      float: right;
      h5{
        text-align: right;
        margin-top: 0.05rem;
        font-weight: 548;
      }
      .xingxing{
        width: 100%;
      }
    }  
  }
  .EvaluateList_2{
    width: 3.01rem;
    // height: 0.63rem;
    height: auto;
    // line-height: 0.01rem;
    font-size: 0.14rem;
    margin: 0.18rem 0 0.1rem 0.54rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .EvaluateList_3{
    width: 3.01rem;
    height: 0.95rem;
    text-indent: 0;
    margin: 0.18rem 0 0.1rem 0.54rem;
    span{
      display: inline-block;
      width: 0.95rem;
      height: 0.95rem;
      overflow: hidden;
      border-radius: 0.1rem;
      margin-right: 0.07rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    span:nth-of-type(3){
      margin-right: 0;

    }
  }
  .EvaluateList_4{
    width: 3.01rem;
    height: 0.28rem;
    text-indent: 0;
    border-bottom: 0.01rem solid #ededed;
    // background-color: violet;
    margin: 0.18rem 0 0.1rem 0.54rem;
    .EvaluateList_4_time{
      width: 1rem;
      height: 0.16rem;
      font-size: 0.12rem;
      color: #a69999;
      display: inline-block;
      margin: 0.02rem 0.6rem 0 0;
    }
    .EvaluateList_4_evalusteNumber{
      display: inline-block;
      width: 0.6rem;
      margin-right: 0.2rem;
      font-size: 0.13rem;
      color: #a69999;
      .tubiao{
        margin-right: 0.05rem;
      }
    }
    .EvaluateList_4_likeNumber{
      display: inline-block;
      width: 0.58rem;
      text-indent: 0.03rem;
      font-size: 0.13rem;
      color: #a69999;
      .tubiao{
        margin-right: 0.05rem;
      }
    }
  }
}
//推荐
.recommend{
  width: 100%;
  height: auto;
  // height: 8rem;
  position: relative;
  left: 0;
  ul{
    width: 100%;
    height: auto;
    margin-top: 0.41rem;
  }
  h4{
    position: absolute;
    left: 0.14rem;
    top: -0.4rem;
  }
}
//推荐列表
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
.xize{
  width: 100%;
  height: 0.18rem;
  text-align: left;
  position: relative;
  left: 0;
  span{font-size: 0.12rem;color:green;margin-left: 0.14rem; margin-top: -0.05rem;display: inline-block;}
  span:nth-of-type(1){color: black;}
  i{
    position: absolute;
    right: 0.16rem;
  }
}
.map{
  margin-top: 0.1rem;
  text-align: left;
  height: 0.55rem;
  line-height: 0.12rem;
  span{
    font-weight: 600;
    margin-bottom: 0.06rem;
  }
}
.concreteTime{
  text-align: left;height: 0.55rem;
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
.van-stepper{
  margin:0.05rem 0 0.05rem 0.23rem;
}
.shouye{
  font-size: 0.18rem;
}
</style>
