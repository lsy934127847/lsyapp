<template>
<div>
        <div class="outerwrapper">
        <div class="innerwrapper">
            <div id="mine">
                <div class="head">
                    <ul>
                        <li><van-image :src="require('../assets/img/renwu.png')" /></li>
                        <!-- <li>{{$store.state.userId}}</li> -->
                        <li>{{name}}</li>
                    </ul>
                </div>

                <!-- <van-cell title="单元格" is-link value="内容" class="iconfont icon-sousuo"/> -->
                <van-cell title="会员中心" is-link  class="iconfont icon-VIP list list1" />
                <van-cell title="我的订单" is-link to="orders_get" class="iconfont icon-order list"/>
                <van-cell title="优惠券" is-link  class="iconfont icon-youhuiquan list"/>
                <van-cell title="我的票" is-link to="login" class="iconfont icon-piaoquan list"/>

                <van-cell title="我的关注" is-link to="login" class="iconfont icon-xiangkan list list5"/>

                <van-cell title="收货地址" is-link to="adds" class="iconfont icon-shouhuodizhi list list6" @click="goAddress()"/>
                <van-cell title="常用观影人" is-link to="login" class="iconfont icon-renwu list"/>
                <!-- <van-cell title="实名认证" is-link to="login" class="iconfont icon-shimingrenzheng list"/> -->
                <van-cell title="实名认证" value="未认证" class="iconfont icon-shimingrenzheng list" />
                <van-cell title="意见反馈" is-link  class="iconfont icon-yijianfankui list"/>
                <van-cell title="客服电话" value="1010-3721" class="iconfont icon-kefudianhua list" />

                <van-button type="default" size="large" class="btn">退出登录</van-button>

                <div class="footer">关于大麦 | 联系我们</div>
            </div>
        </div>        
    </div>
    <router-view></router-view>
</div> 
   
</template>

<script>
import {mapState} from 'vuex';
import {Image as VanImage,Cell, CellGroup , Button,List} from 'vant';

export default {
    data(){
        return{
            name:'',
        }
    },
    computed:{
        ...mapState({
            userId:(state) => state.userId
        })
    },
    methods:{
        // goAddress(){
        //     this.$router.push({
        //         name:'address'
        //     })
        // }
    },
    created(){
        this.$axios.get('/api/users/one',{
            params:{id:this.userId}
        }).then((res)=>{
            if(res.data.code == 0){
                // console.log(res.data)
                this.name = res.data.data.username;
                // console.log(this.name);
            }
        })
    }
}
</script>

<style lang="scss" scoped>
html,body{
    width: 100vw;
    height: 100vh;
}

.outerwrapper{
    overflow: hidden;
}
.innerwrapper::-webkit-scrollbar{
    display:none;
}
.innerwrapper{
    height:100vh;
    overflow-y:scroll;
}
#app{
    height:100%;
}
#mine{
    width: 100%;
    // height: 700px;
    height: auto;
    background-color: #f2f3f4;
    // overflow: auto;
    // overflow-y: scroll; 
    // white-space: nowrap;
}
.head{
    width: calc(100% - 0.32rem);
    height: 0.6rem;
    background: #ff1268;
    padding: 16px;
    // box-sizing: border-box;
    ul{
        width: 2rem;
        height: 0.6rem;
        li:nth-of-type(1){
            width: 0.5rem;
            height: 0.5rem;
            border-radius:50% ;
            border: 0.05rem solid white;
            float: left;
            overflow: hidden;
        }
        li:nth-of-type(2){
            width: 1rem;
            height: 1.5rem;
            text-align: center;
            line-height: 0.6rem;
            margin-left: 0.25rem;
            color: white;
            font-size: 0.14rem;
            overflow: hidden;
        }
    }
}
.van-cell__title{
    text-align: left;
    text-indent: 0.1rem;
    color: black;
    font-size: 0.14rem;
}
.list{
    color: pink;
    height: 0.54rem;
    line-height: 0.3rem;
}
.list1{
    margin-top: 0.1rem;
    color: brown;
}
.list5{
    margin-top: 0.1rem;
}
.list6{
    margin-top: 0.1rem;
}
.btn{
    margin-top: 0.1rem;
}
.footer{
    width: 100%;
    height: 0.7rem;
    text-align: center;
    line-height: 0.7rem;
    font-size: 0.12rem;
    color: #999999;
}

</style>