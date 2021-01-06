<template>
    <div id="address_edit">
        <div class="head">
            <span><van-icon name="arrow-left" @click="Back()"/></span>
            <span>编辑地址</span>
        </div>
      <van-form @submit="onSubmit">
          <van-field
            v-model="name"
            name="name"
            label="联系人"
            :placeholder="OneData.name"
            :rules="[{ required: true, message: '请编辑新联系人' }]"
          />
          <van-field
            v-model="tel"
            type="tel"
            name="tel"
            label="联系电话"
            :placeholder="OneData.tel"
            :rules="[{ required: true, message: '请编辑新号码' }]"
          />
           <van-field
            v-model="address"
            type="address"
            name="address"
            label="地址"
            :placeholder="OneData.address"
            :rules="[{ required: true, message: '请编辑新地址' }]"
          />

          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" class="xiugai">
              确认修改
            </van-button>
          </div>

          <span class="shanchu" @click="del()">
              删除地址
          </span>

      </van-form>

    </div>
</template>

<script>
import { Form,Button,Toast} from 'vant';
import { mapState,mapActions } from 'vuex';
export default {
    data(){
        return {
            name:'',
            tel:'',
            address:'',
            //单个地址的id
            id:'',
            //修改地址所需的参数
            params:{
                address:'',
                addressId:'',
                name:'',
                tel:'',
                usersId:'',
            },
        };
    },
    computed:{
        ...mapState({
            OneData:(state) => state.editAddress.OneData,
            userId:(state) => state.userId,
        })
    },
    methods:{
        ...mapActions('editAddress',{
            requestOneData:'requestOneData',
        }),
        //修改地址
        onSubmit(values){
            // console.log(values);
            if(values != ''){
                this.params.name = values.name;
                this.params.tel  = values.tel;
                this.params.address = values.address;
                // console.log(this.params);
                this.$axios.post('/api/address/update',{
                    name:this.params.name,
                    tel:this.params.tel,
                    address:this.params.address,
                    usersId:this.params.usersId,
                    addressId:this.params.addressId,
                }).then((res)=>{
                    // console.log(res.data);
                }).catch((err)=>{
                    // console.log(err);
                })
                Toast.success("地址修改成功！");
            }
        },
        Back(){
            this.$router.back();
            // console.log("111");
        },
        //删除地址
        del(){
            // console.log(this.id);
            let param = {id:this.id};
            // console.log(param);
            this.$axios.get('/api/address/del',{
                params:param
            }).then((res)=>{
                if(res.data.code == 0){
                    // console.log(res.data),
                    Toast.success('地址删除成功！')
                }
                else if(res.data.code == -1){
                    Toast.fail('地址已经被删除！')
                }
            }).catch((err)=>{
                // console.log(err);
                Toast.success('删除地址失败！')
            })
        }
    },
    created(){
        // console.log(this.$route.params);
        this.id = this.$route.params.id;
        this.requestOneData({id:this.id});
        this.params.addressId = this.id;
        this.params.usersId = this.userId;
        // console.log(this.params);
        // console.log(this.OneData);
    }
};
</script>

<style lang="scss" scoped>
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
.shanchu{
    margin: 0.25rem auto;
    width: 3.43rem;
    height: 0.41rem;
    background-color: red;
    border-radius:0.18rem;
    display: block;
    text-align: center;
    line-height: 0.41rem;
    color: white;
    font-size: 0.15rem;
}
.xiugai{
    margin-top: 0.15rem;
}
</style>