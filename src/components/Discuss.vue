<template>
  <div id="discuss">
      <div class="head">
          <span id="back" @click="goBack()"><van-icon name="arrow-left" class="zuo"/><span>返回</span></span>
          <span id="titles">发布评论</span>
          <span id="release" @click="uploading()">发布</span>
      </div>
      <div class="discussing">
          <van-divider :style="{ color: '#d5d5d5', borderColor: 'black', padding: '0 16px'}">您的点评</van-divider>

            <div class="Write">
               <van-field v-model="message" rows="2" autosize label="评论" type="textarea" maxlength="100" placeholder="请输入评论" show-word-limit class="writing"/>
            </div> 

            <span id="Fa">发几张照片来分享一下吧！最多可以选3张图(选填)</span>
            <!-- 上传照片 -->
            <van-uploader v-model="fileList" multiple :max-count="3" class="Putphone"/>
            <!-- 星星评分 -->
            <div id="grade">

                <span id="xingji">星级点评</span>

                <van-rate v-model="value" :size="25" color="#ffd21e" void-icon="star" void-color="#eee" class="xing" @change="onChange"/>
            </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Divider, Field , Uploader ,Rate , Toast } from 'vant';

export default {
    data(){
        return{
            message:'',
            fileList: [],
            value: 0,
        }
    },
    methods:{
        goBack(){
            $this.router.push(-1);
        },
        onChange(value){
            // this.value = this.value*2;
            var values = this.value * 2;
            // console.log(values);
        },
        uploading(){
            alert("111");
            // if(!this.message){
            //     Toast.fail('请添加评论！');
            // }
            // else{
            //     // console.log({this.message,this.fileList,this.value});

            // }
        }
    }

}
</script>

<style lang="scss" scoped>
.head{
    width: 100%;
    height:0.4rem;
    background-color: #ff1268;
    position: relative;
    top: 0;
    left: 0;
}
#back{
    display: inline-block;
    width: 1rem;
    height: 0.2rem;
    font-size: 0.15rem;
    // color: #e2e2e2;
    color: white;
    position: absolute;
    left: 0.2rem;
    top: 0.1rem;
    text-align: left;
    opacity: 0.7;
    span{
        display: block;
        float: left;
        margin-left:0.02rem;
    }
}
#titles{
    width: 1rem;
    height: 0.2rem;
    text-align: center;
    color: white;
    margin:0.1rem auto;
    display: inline-block;
}
#release{
    display: inline-block;
    color: white;
    width: 0.5rem;
    height: 0.2rem;
    text-align: right;
    position: absolute;
    right: 0.2rem;
    top: 0.1rem;
    line-height: 0.2rem;
}
#xingji{
    width: 1rem;
    height: 0.3rem;
    background-color: peachpuff;
    font-size:0.18rem ;
    display: inline-block;
    position: absolute;
    left: 0.38rem;
    top: 0.13rem;
    border-radius: 0.08rem;
    line-height: 0.3rem;
}
#Fa{
    color: #acacac;
    font-size: 0.13rem;
}
#grade{
    width: 100%;
    height: 0.53rem;
    // background-color: #FF0088;
    background-color: #ff1268;
    margin-top: 0.2rem;
    border: 0.01rem solid transparent;
    box-sizing: border-box;
    position: relative;
    left: 0;
}

.discussing{
    width: 100%;
    height: 3.18rem;
    background-color: #f5f5f5;
}

</style>
<style lang="scss">
.zuo{
    font-size: 0.2rem;
    float: left;
}
.writing{
    width: 90%;
    margin:20px auto;
    height: 1.2rem;
    .van-field__word-limit{
        margin-top: 0.43rem;
    }
    .van-field__body{
        height: 0.5rem;
    }
}
.Putphone{
    margin-top: 0.14rem;
}
.xing{
    // margin:0.14rem auto;
    margin:0.14rem 0 0 1.22rem;
}
</style>