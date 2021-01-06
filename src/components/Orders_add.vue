<template>
<div>
  <div id="orders">
    <van-nav-bar title="订单详情" left-text="返回" left-arrow class="daohang" @click-left="Back()">
        <template #right>
            <van-icon name="ellipsis" size="18" />
        </template>
    </van-nav-bar>

    <div class="BuyDone">
        <span class="pay iconfont icon-order-"><span>正在支付</span></span>
        <p class="prices">支付金额(含运费、关税) : ￥{{Payment}}</p>
        <p>运费 ： 20 关税 ：20 </p>
    </div>    
    <!-- 收货地址 -->
    <div class="Address">
        <p><span class="iconfont icon-location1"></span> 收货人 ：{{indexItems.name}}</p>
        <p>收货地址 :  {{indexItems.address}}</p>
        <p>联系电话 :  {{indexItems.tel}}</p>

        <span class="tianjia" @click="goAddress()">添加收货地址<span class="iconfont icon-yijianfankui"></span></span>
    </div>

    <!-- 订单栏 -->
    <p>订单详情</p>
    <ul class="Order">
        <!-- <li v-for="(item,index) in detailLists" :key="index" class="order_list"> -->
        <li class="order_list">
            <div class="Img"><img :src="detailLists.verticalPic" alt=""></div>
            <div class="right">
                <p class="right_title">
                    <span class="Names">【{{detailLists.cityName}}】{{detailLists.name}}</span>
                    <span id="prices">￥{{Pricing.totals}}</span>
                </p>
                <p class="right_select">
                    <span v-show="detailLists.isSelectSeat == true" class="select">可选座</span>
                    <span v-show="detailLists.isSelectSeat === false" class="select">不可选座</span>
                    <span v-show="detailLists.isEticket === true" class="select">电子票</span>
                    <span v-show="detailLists.isEticket === false" class="select">纸质票据</span>
                    <span v-show="detailLists.isAotu === true" class="select">自动取票</span>
                </p>
                <p class="juchang">剧场：{{detailLists.venueName}}</p>
            </div>
            <div class="paying">
                <p>运费：￥20</p>
                <p>关税：￥20</p>
                <p>实付 :<span>￥{{Payment}}</span></p>
            </div>
            

        </li>
    </ul>

    <div class="Bottoms">
        <span @click="goMine()">个人中心</span> <span @click="goOk()">提交订单</span>
    </div>
  </div>
    <router-view></router-view>
</div>  
</template>

<script>
import { mapState } from 'vuex';
import { NavBar , Divider,Toast} from 'vant';

export default {
    data(){
        return{
            price:326,
            Address:{
                name:'大河',
                addres:'南昌',
                tel:'1324',
            },
            Pricing:{},

            orders:[
                {verticalPic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604239898058&di=99884470df76756e0a632453686f9b7a&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201501%2F27%2F20150127103509_KvXhU.thumb.700_0.jpeg',total:300,number:2,performanceName:'音乐会从十大撒旦打算的撒萨达', cityName:'北京',venueName:'北京大剧院',isSelectSeat:true,isEticket:false,isAotu:true},
            ],
        }
    },
    computed:{
        ...mapState({
            //拿取商品详情数据和地址
            detailLists:(state) => state.detail.detailLists,
            indexItems:(state) => state.indexItem,
            userId:(state) => state.userId,
            // address:
        }),
        Payment:function(){
            var payment;
            payment = parseInt(this.Pricing.totals)+40;
            return payment;
        }
    },
    methods:{
        goAddress(){
            this.$router.push({
                name:'address'
            })
        },
        //提交订单/添加订单
        goOk(){
            if(!this.indexItems){
                Toast.fail('请添加收货地址！');
                return false;
            }else{
                // Toast.success('订单提价成功，请静候！')
                // console.log(this.detailLists);
                //地址栏传输过来的数据
                // console.log(this.Pricing);
                // console.log(this.detailLists.name)
                this.$axios.post('/api/order/add',{
                    performanceId:this.detailLists.performanceId,
                    performanceName:this.detailLists.name,
                    performBase:this.Pricing.sets,
                    priceList:this.Pricing.dang,
                    total:this.Pricing.totals,
                    number:this.Pricing.items,
                    cityName:this.detailLists.cityName,
                    venueName:this.detailLists.venueName,
                    verticalPic:this.detailLists.verticalPic,
                    isEticket:this.detailLists.isEticket,
                    isSelectSeat:this.detailLists.isSelectSeat,
                    isAotu:this.detailLists.isAotu,
                    address:this.indexItems,
                    userId:this.userId
                }).then((res)=>{
                    if(res.data.code == 0){
                        Toast.success('订单添加成功！请前往订单栏查看')
                        // console.log(res);
                    }else{
                        Toast.fail('订单添加失败，请补全信息!')
                    }
                }).catch((err)=>{
                    Toast.fail('订单添加失败，请补全信息!')
                })
            } 
        },
        goMine(){
            this.$router.push({
                name:'mine'
            })
        },
        Back(){
            this.$router.back();
        }
    },
    created(){
        //地址栏传输过来的数据
        this.Pricing = this.$route.params
        // console.log(this.indexItems);
        // console.log(this.Pricing);
    }
}
</script>

<style scoped lang="scss">
#orders{z-index: 998;}
*{margin: 0;padding: 0;}
.BuyDone{
    width: 100%;
    height: 0.88rem;
    background-color: #fc6c81;
    border: 0.01rem solid transparent;
    box-sizing: border-box;
    text-align: left;
    box-sizing: border-box;
    p{
        font-size: 0.13rem;
        color: #ffe5f1;
        margin:0.02rem 0 0.03rem 0.37rem;
    }
}
.Bottoms{
    width: 100%;
    height: 0.55rem;
    padding:0.2rem 0.1rem 0 0;
    text-align: right;
    border: 0.01rem solid transparent;
    box-sizing: border-box;
    span{
        display: inline-block;
        width: 0.8rem;
        height: 0.55rem;
        border: 0.01rem solid #999999;
        text-align: center;
        line-height: 0.55rem;
        font-size: 0.15rem;
        color: #999999;
        margin-right: 0.1rem;
    }
    span:nth-of-type(2){
        color: red;
        border-color: deeppink;
    }
    span:hover{
        color: deeppink;
        border-color: red;
    }   
}
.paying{
    width: 100%;
    height: 1rem;
    text-align: right;
    clear: both;
    line-height: 2;
    border: 0.01rem solid transparent;
    box-sizing: border-box;
    padding-right: 0.17rem;
    P{
        border-bottom: 0.01rem solid #999999;
        box-sizing: border-box;
    }
    p:nth-of-type(3)>span{
        color: deeppink;
    }
}
.PayR{
    width:100%;
    height: 0.3rem;
    background-color: red;
    margin-top: 0.03rem;
    text-align: right;
    padding-right:0.14rem ;
    border: 0.01rem solid transparent;
    box-sizing: border-box;
}
.juchang{
    width: 100%;
    height: 0.22rem;
    margin-top: 0.1rem;
    text-align: left;
    text-indent: 0.07rem;
    font-size: 0.13rem;
}
.Order{
    // width: calc(100% - 0.2rem);
    width: calc(100% - 0.18rem);
    // height: calc(auto - 0.2rem);
    height: auto;
    padding: 0.1rem;
    border: 0.01rem solid deeppink;
    box-sizing: border-box;
    margin: 0 auto;
}
.right_select{
    width: 100%;
    height: 0.27rem;
    text-indent: 0.08rem;
    text-align: left;
    span{
        display: inline-block;
        width: 0.6rem;
        color: #666666;
        height: 0.18rem;
        border: 0.01rem solid  #d7d7d7;
        border-radius:0.15rem;
        font-size: 0.12rem;
        line-height: 0.18rem;
        margin-top: 0.05rem;
    }
}

.order_list{
    width: 3.5rem;
    height: 1.95rem;
    margin: 0.25rem auto;
    // background-color: #e2e2e2;
    .Img{
        width: 1.2rem;
        height: 0.85rem;
        overflow: hidden;
        float: left;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .right{
        width: 2.3rem;
        height: 0.86rem;
        float: left;
    }
}
.right_title{
    width:2.3rem;
    height: 0.24rem;
    text-align: left;
    .Names{
        width: 1.5rem;
        height: 0.2rem;
        color: black;
        display: block;
        float: left;
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size: 0.14rem;
    }
    #prices{
        display: block;
        float: left;
        width: 0.6rem;
        height: 0.2rem;
        font-weight: 500;
        margin-left: 0.2rem;
    }
}
.pay{
    width:1rem;
    height: 0.2rem;
    color: #ffe5f1;
    display: block;
    margin:0.12rem 0 0.05rem 0.15rem ;
    span{
        font-size: 0.13rem;
        margin-left: 0.06rem;
    }
}
.Address{
    width: 100%;
    height: 1.2rem;
    text-align: left;
    text-indent: 0.34rem;
    border: 0.01rem solid transparent;
    box-sizing: border-box;
    font-size: 0.14rem;
    color: black;
    position: relative;
    left: 0;
    border-bottom: 0.01rem solid #999999;
    p{
        width: auto;
        height: 0.22rem;
        margin-bottom: 0.06rem;
    }
    p:nth-of-type(1){
        margin-top:0.2rem;
        text-indent: 0.14rem;
    }
    .tianjia{
        display: block;
        width: 1.21rem;
        height: 0.2rem;
        text-indent: 0.13rem;
        border: 0.01rem solid transparent;
        border-radius: 0.15rem;
        font-size: 0.13rem;
        color: #999999;
        background-color:#dddddd ;
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        span{
            width: 0.2rem;
            margin-left: 0.06rem;
        }
    }
}
</style>
<style lang="scss">
.daohang{
    .van-nav-bar__left{
        span{
            color: deeppink;
        }
    }
}
.van-nav-bar__left{
    span{
        color: deeppink;
    }
}
.van-nav-bar .van-icon{
    color: deeppink;
}
.van-nav-bar__title{
    color: deeppink;
}
</style>