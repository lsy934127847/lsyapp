<template>
  <div id="login">
        <div class="iconImg"><img :src="icon" alt=""></div>
        <van-form @submit="onSubmit" class="LoginForm">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                class="ipt"
                placeholder="请输入用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                class="ipt"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div class="getYZM">
                <label>验证码</label>
                <input type="text" name="yzm" class="form-control" placeholder="请输入验证码" autocomplete="off" v-model="CAPTCHA">
                <img @click="yzmImg()" src="/api/yzm" alt="" ref="yzm">
            </div>
            <div  class="btn">
                <van-button  type="info" native-type="submit" class="btn-login">
                登录
                </van-button>
            </div>
            <router-link to="/register" class="a-register">新用户注册</router-link>

        </van-form>
  </div>
</template>

<script>
import { Form,Button,Toast }  from 'vant';

export default {
  data() {
    return {
      username: '',
      password: '',
      CAPTCHA:'',
      token:'',
      icon:'//gw.alicdn.com/tfs/TB1QfeUQAvoK1RjSZFDXXXY3pXa-300-138.png'
    };
  },
  methods: {
    onSubmit(values) {
    //   console.log('submit', values);
        this.$axios.post('/api/users/login',{
            username:this.username,
            password:this.password,
            CAPTCHA:this.CAPTCHA,
        }).then((res)=>{
            // console.log(res.data);
            if(res.data.code == 0){
                Toast.success('恭喜你，登录成功！');
                this.$router.push('/home');
                //把token放入到本地存储中
                localStorage.setItem('token',res.data.token);
            }
            else{
                Toast.fail('登录失败，请重新登录！');
            }
        }).catch((err)=>{
            Toast.fail('登录失败，请重新登录！');

        })
    },
    yzmImg(){
        this.$refs.yzm.src = '/api/yzm?' + Math.random();
    }
  },
  created(){
    //   this.yzmImg();
  },
  mounted(){
      //因为获取验证码是dom操作，所以需要在mounted阶段进行
      this.yzmImg();
  }
};
</script>

<style scoped lang="scss">
*{margin: 0; padding: 0;}
#login{
    position: relative;
    top: 0.5rem;
    left: 0;
}
.LoginForm{
    width: 3.3rem;
    height:2.7rem;
    border-radius:0.15rem ;
    padding: 0.2rem 0.1rem 0.1rem 0.1rem;
    margin: 0.1rem auto;
    .ipt{
        padding-top:0.2rem ;
    }
    .getYZM{
        float: left;
        margin: 0.15rem 0.15rem 0.15rem 0;
        // margin-top:0.3rem ;
        margin-left: 0;
        text-align: left;
        label{
            margin-right: 0.5rem;
        }
        input{
            border: none;
        }
        img{
            display: inline-block;
            width: 110px;
        }
    }
}
.iconImg{
    width: 1rem;
    height: 0.45rem;
    margin: 0 auto;
    img{
        width: 100%;
        height: 100%;
    }
}
.damai{
    margin: 0 auto;
    border-radius: 0.15rem;
    width: 1.2rem;
}
.btn-login{
    display: inline-block;
    width:3.25rem;
    border-radius: 0.07rem;
    margin-top: 0.12rem;
    border:none ;
    background-image: -webkit-linear-gradient(left,#ff4aae,#ff1268);
}
.a-register{
    float: right;
    font-size: 0.12rem;
    margin-top: 0.11rem;
}
.form-control{
    width: 100px;
}

</style>