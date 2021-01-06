<template>
    <div class="qf-goodadd">
       <h1>商品新增</h1>
       <div class="qf-form">
          <el-form 
          :model="info" 
          :rules="rules" 
          ref="ruleForm" 
          label-width="100px" 
          class="demo-ruleForm">
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="info.name"></el-input>
            </el-form-item>

         
            <el-form-item label="商品描述" prop="desc">
                <el-input type="textarea" v-model="info.desc"></el-input>
            </el-form-item>



             <el-form-item label="选择品类" prop="cate" >
               <CateSelect v-model='info.cate'></CateSelect>
            </el-form-item>


            <el-form-item label="商品价格" prop="price">
                 <el-input-number v-model="info.price"  :min="0" :max="10000" label="商品价格"></el-input-number>
            </el-form-item>





           <el-form-item label="商品照片" prop="img">
                 <el-upload  id="photo"
                    :action="imgUpUrl"
                    list-type="picture-card"
                    :multiple="false"
                    :on-success="imgSuccess"
                  
                   >
                    <i class="el-icon-plus"></i>
                </el-upload>
                 <el-dialog :visible.sync="dialogVisible">
                       <img width="100%" :src="info.img" alt="img">
                </el-dialog>
            </el-form-item>
              
  
            <el-form-item label="是否热销" prop="hot">
                <el-switch v-model="info.hot"></el-switch>
            </el-form-item>

       

            <el-form-item>
                <el-button type="primary" @click="submitForm">添加商品</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>

        </el-form>
           
       </div>
    </div>
</template>

<script>

 import  CateSelect  from '@/components/good/CateSelect.vue'
 import  a  from '@/utills/img.js'


export default {
name:'GoodAdd',
  components:{
     CateSelect
  },

  data: function() {
    
    return {
      imgUpUrl:a.imgUpUrl,
      info: {
        name: "",
        desc: "",
        hot: "false",
        cate:'',
        num:'',
        price:'0',
        img:''
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
  
    
        desc: [{ required: true, message: "请填写商品描述", trigger: "blur" },
          { min: 10, max: 20, message: "长度在 10 到 20 个字符", trigger: "blur" }
        ],

         cate: [{ required: true, message: "请填写商品品类", trigger: "blur" },
         
        ],
       
      },
       catearr:[
            {id : 1,cate :'a',cate_zh:'汽车用品'},
             {id : 2,cate :'b',cate_zh:'母婴用品'},
            //   {id : 1,cate :'a',cate_zh:'汽车用品'},
        ],
        dialogVisible:false
    };
  },
  methods: {
    // 商品规则
    submitForm() {
      console.log("商品信息", this.info);

      // 文件图片上传，在postman上使用form-data 
      this.$http.fetchAddorEdit(this.info).then(()=>{
        this.$router.replace('/good/list')
      })
    },
    imgSuccess(res){
      console.log('上传成功')
      this.info.img = res.data.url
    }
  }
};
</script>

<style lang="scss" scoped>
.qf-form{
    margin-top:50px;
    width:60%
}

</style>