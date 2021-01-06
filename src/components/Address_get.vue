<template>
  <div id="address_get">
        <div class="head">
            <span @click="Back()"><van-icon name="arrow-left" /></span>
            <span>AddressList</span>
        </div>
        <van-address-list
            v-model="chosenAddressId"
            :list="address"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
        >
        <van-button type="info" @click="goConfirm()" class="xuanze">确定</van-button>
        </van-address-list>
  </div>
</template>

<script>
import { mapState,mapActions,mapMutations } from 'vuex';
import { AddressEdit ,  AddressList , Toast ,Button} from 'vant';

export default {
  data() {
    return {
      chosenAddressId: '',
      Addressing:{},
    };
  },
  computed:{
    ...mapState({
      address:(state) => state.getAddress.address,
    })
  },
  methods: {
    ...mapActions('getAddress',{
      requestAddress:'requestAddressData',
    }),
    ...mapMutations([
      'SET_INDEXITEM',
    ]),
    onAdd() {
      Toast('新增地址');
      this.$router.push({
        name:'add'
      })
    },
    onEdit(item, index) {
      // Toast('编辑地址:' + index);
      this.$router.push({
        name:'edit',
        params:item
      })
    },
    Back(){
      this.$router.back();
      // console.log("111")
    },
    goConfirm(){
      var indexItem ;
      // console.log(this.chosenAddressId);
      this.address.find((item)=>{
        if(item.id == this.chosenAddressId){
          // console.log(item);
          indexItem = item;
          return indexItem;
        }
      });
      // console.log(indexItem);
      //把数据存入到仓库中
      this.SET_INDEXITEM(indexItem);

      //路由跳转到订单页面,把选择的收获地址传入到订单页
      this.$router.push({
        name:'orders',
      })
    }
  },
  created(){
    this.requestAddress();
  }
};
</script>

<style lang="scss" scoped>
#address{ background-color: #f7f8fa;}
#address_get{z-index: 999; background-color:deeppink;position: absolute;top: 0px; width: 100%;height: 100%;}
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
.xuanze{
  width: 3.3rem;
  height: 0.44rem;
  border-radius: 0.23rem;
  margin-top: 0.25rem;
}
</style>