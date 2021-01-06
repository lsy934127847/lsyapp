<template>
  <div id="add">
      <div class="head">
            <span @click="Back()"><van-icon name="arrow-left" /></span>
            <span>AddressAdd</span>
      </div>
      <van-form @submit="onSubmit">
          <van-field
            v-model="name"
            name="name"
            label="联系人"
            placeholder="请输入联系人姓名"
            :rules="[{ required: true, message: '请填写联系人' }]"
          />
          <van-field
            v-model="tel"
            type="tel"
            name="tel"
            label="联系电话"
            placeholder="请输入联系电话"
            :rules="[{ required: true, message: '请填写号码' }]"
          />
           <van-field
            v-model="address"
            type="address"
            name="address"
            label="地址"
            placeholder="请输入收货地址"
            :rules="[{ required: true, message: '请填写地址' }]"
          />

          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              提交
            </van-button>
          </div>
      </van-form>


  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Form,Button,Toast }  from 'vant';

export default {
  data() {
    return {
      name:'',
      tel:'',
      address:'',
    };
  },
  computed:{
    ...mapState({
      userId:(state) => state.userId,
    })
  },
  methods: {
    onSubmit(values) {
      console.log(this.name,this.tel,this.address,this.userId);
      // console.log('submit', values,this.userId);
      console.log(values);
      this.$axios.post('/api/address/add',{
        name:this.name,
        tel:this.tel,
        address:this.address,
        userId:this.userId,
      }).then((res)=>{
        console.log(res.data);
        if(res.data.code == 0){
            Toast.success('恭喜你，添加地址成功！');
        }
        else{
           Toast.fail('添加失败，请重新添加');
        }
      }).catch((err)=>{
           Toast.fail('添加失败，请重新添加');
      })
    },
    Back(){
        this.$router.back();
    },
  }  
}
</script>

<style lang="scss" scoped>
#add{ background-color: #f7f8fa;}
.head{
    width: 100%;
    height: 0.65rem;
    background-color: white;
    position: relative;
    top: 0;
    span:nth-of-type(1){
        display: inline-block;
        width: 0.2rem;
        height: 0.3rem;
        position: absolute;
        top: 0.2rem;
        left: 0.15rem;
        font-size: 0.2rem;
    }
    span:nth-of-type(2){
        display: inline-block;
        width: 1rem;
        height: 0.3rem;
        position: absolute;
        top:0.2rem;
        left: 1.34rem;
        font-size: 0.2rem;
    }
}
</style>