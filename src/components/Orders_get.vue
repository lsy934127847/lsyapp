<template>
  <div id="orders">
    <van-nav-bar title="全部订单" left-text="返回" left-arrow @click-left="onClickLeft" class="daohang">
        <template #right>
            <van-icon name="ellipsis" size="18" />
        </template>
    </van-nav-bar>

    <!-- 订单栏 -->
    <ul class="Order">
        <li v-for="(item,index) in orderList" :key="index" class="order_list">
            <div class="Img"><img :src="item.verticalPic" alt=""></div>
            <div class="right">
                <p class="right_title">
                    <span class="Names">【{{item.cityName}}】{{item.performanceName}}</span>
                    <span id="prices">￥{{item.total}}</span>
                </p>
                <p class="quantity"><span>剧场：西安剧场</span>       数量:  x  2 </p>
                <p class="PayR"><span class="Return" @click="ReturnOrder(item.orderId)">退单</span>实付款：<span>￥{{item.total}}</span></p>

            </div>

        </li>
    </ul>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import { NavBar, Toast } from 'vant';

export default {
    data(){
        return{
        }
    },
    computed:{
        ...mapState({
            orderList:(state) => state.getOrders.orderList,
            userId:(state) => state.userId,
        })
    },
    methods:{
        ...mapActions('getOrders',{
            requestOrderList : 'requestOrderListData',
        }),
        ReturnOrder(item){
            var confirms = confirm("确定删除此订单?");
            if(!confirms){
                return
            }
            else{
                this.$axios.get('/api/order/del',{
                    params:{id:item}
                }).then((res)=>{
                    if(res.data.code == 0){
                        Toast.success('删除订单成功！请等待客服退款');
                    }
                    else{
                        Toast.fail('删除订单失败，请重新操作');
                    }
                }).catch((err) => {
                    Toast.fail('删除订单失败，请重新操作');
                })
                //删除之后重新请求该用户的订单数据,重新渲染
                this.requestOrderList({userId:this.userId});
            }        
        },
        onClickLeft() {
            this.$router.back();
        },
    },
    created(){
        // console.log(this.userId);
        this.requestOrderList({userId:this.userId});
    }
}
</script>

<style scoped lang="scss">
*{margin: 0;padding: 0;}
.BuyDone{
    width: 100%;
    height: 0.88rem;
    background-color: #fc6c81;
    border: 0.01rem solid transparent;
    box-sizing: border-box;
    text-align: left;
    p{
        font-size: 0.13rem;
        color: #ffe5f1;
        margin:0.02rem 0 0.03rem 0.37rem;
    }
}
.PayR{
    width:100%;
    height: 0.3rem;
    margin-top: 0.03rem;
    text-align: right;
    padding-right:0.12rem ;
    border: 0.01rem solid transparent;
    box-sizing: border-box;
    span{
        color: deeppink;
    }
    .Return{
        display: inline-block;
        text-align: center;
        width: 0.55rem;
        height: 0.22rem;
        line-height: 0.18rem;
        font-size: 0.12rem;
        color: red;
        margin-right: 0.38rem;
        box-sizing: border-box;
        border-radius: 0.1rem;
        border: 0.02rem solid red;
    }
}
.Order{
    // width: calc(100% - 0.2rem);
    width: 100%;
    // height: calc(auto - 0.2rem);
    height: auto;
    padding: 0.1rem;
    border: 0.02rem solid deeppink;
    box-sizing: border-box;
}
.quantity{
    width: 100%;
    height: 0.23rem;
    box-sizing: border-box;
    // text-align: right;
    text-align: left;
    text-indent: 0.05rem;
    padding-right: 0.2rem;
    // background-color: red;
    font-size: 0.15rem;
    span{
        display: inline-block;
        width: 1.1rem;
        height: 0.23rem;
        font-size: 0.15rem;
        color: #999999;
        margin-right: 0.21rem;
    }
}
.order_list{
    width: 3.5rem;
    height: 0.85rem;
    margin: 0.25rem auto;
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
        width: 2.23rem;
        height: 0.86rem;
        float: left;
        background-color: lightyellow;
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