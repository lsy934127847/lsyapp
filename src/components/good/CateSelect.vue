<template>
    <div class="qf-cate-select">
         <el-select 
         @change="change"
         v-model="cate" 
         placeholder="请选择品类" 
         :size='size'
         :clearable='clearable'
         >
                    <el-option
                    v-for="item in catearr"
                    :key="item._id"
                    :label="item.cate_zh"
                    :value="item.cate">
                    </el-option>
                </el-select>
    </div>
</template>

<script>
export default {

  props:{
     value:{
         type:String,
         required:false,
         default:''
     },
     size:{
         type:String,
        //  是否必填
         required:false,
        //  默认
         default:'medium' 
     },
     clearable:{
         type:Boolean,
         required:false,
         default:false
     }
  },

  data: function() {

    return {
        cate:'',
      catearr: [
        { id: 1, cate: "a", cate_zh: "汽车用品" },
        { id: 2, cate: "b", cate_zh: "母婴用品" }
        //   {id : 1,cate :'a',cate_zh:'汽车用品'},
      ]
    };
  },
  mounted(){
     this.$http.fetchAllCates().then(res=>{
         console.log('品类泪飙',res)
         this.catearr = res.list
     }) 
  },
  methods:{
      change(){
         this.$emit('input',this.cate) 
             this.$emit('change') 
      }
  }
};
</script>

<style lang="scss" scoped>
</style>