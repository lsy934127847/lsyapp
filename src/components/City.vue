<template>
    <div class="city">
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

    </div>

</template>

<script>
import { mapState,mapActions  } from "vuex";
import { Cell,IndexBar,IndexAnchor} from 'vant';

export default {
    name:'city',
    computed:{
        ...mapState({
            hotcity:(state) => state.city.hotcity,
            city:(state) => state.city.cityall,
        })
    },
    data(){
        return{
        }
    },
    methods:{
        ...mapActions('city',{
            requestHotcity:'requestHotcityData',
            requestCity:'requestCityData',
        }),
        ChooseCity(city){
            this.$router.push({
                name:'home',
                params:city
            });
        }
    },
    created(){
        this.requestHotcity();
        this.requestCity();
    }
}
</script>

<style lang="scss" scoped>
*{margin: 0; padding: 0;}
::-webkit-scrollbar {
    display:none ;
}
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
</style>