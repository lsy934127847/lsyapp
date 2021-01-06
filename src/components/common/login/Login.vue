<template>
    <div class="qf-login">
        <div class="qf-login-wrap">
            <el-form :model="user" :rules="rules"  label-width="100px" label-color="white">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="user.username"></el-input>
            </el-form-item>
             <el-form-item label="密码" prop="password">
                 <el-input  show-password v-model="user.password"></el-input>
            </el-form-item>   
              <el-form-item>
                    <el-button type="primary" @click="loginSubmit">登录</el-button>
                    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </el-form-item>     
        </el-form>
        </div>
       
    </div>
</template>

<script>
export default {

// import { fetchLogin  } from "module";

  data: function() {
    return {
      user: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { pattern:/^[a-zA-Z][a-zA-Z0-9]{1,9}$/, message: "用户名格式不正确", trigger: "blur" }
        ],
         password: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { pattern:/^[a-zA-Z][a-zA-Z0-9]{5,17}$/, message: "用户名格式不正确", trigger: "blur" }
        ],
       
      } 
    };
  },
  methods:{
      loginSubmit(){
    //   console.log('loginSubmit',this.user)
        // this.$router.history.push('/')
      

        console.log('http',this.$http)
        console.log(this.$http.fetchLogin(this.user))
        this.$http.fetchLogin(this.user).then(res=>{
            console.log(res)
           
            //  把token 存储在localstorage 中
            localStorage.setItem('token',res.token)
              if(res){
                  alert('登录成功')
                    this.$router.history.push('/')
              }else{
                  alert('登录失败')
              }
            

            
        })
        
  }
  }

};
</script>

<style lang="scss" >

.qf-login{
   
  
    background-color: #585252;
    position: absolute;
    width:400px;
    height:400px;
    // padding-bottom: 20px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
}
.qf-login-wrap{
    width:350px;
    // height:200px;
    // background-color: #444;
     position: absolute;
     top: 50%;
   
    left: 50%;
    transform: translate(-50%,-50%);
    
}
.el-form-item__label{
    color:white !important
}

</style>