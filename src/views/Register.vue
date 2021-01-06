<template>
  <div id="register">
        <div class="iconImg"><img :src="icon" alt=""></div>
        <van-form @submit="onSubmit()" class="RegisterForm">
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
            <van-field
                v-model="password2"
                type="password"
                name="password2"
                label="确认密码"
                class="ipt"
                placeholder="请再次输入密码"
                :rules="[{ validator, message: '请再次填写密码！',required:true }]"
            />
            <div  class="btn">
                <van-button  type="info" native-type="submit" class="btn-login">
                同意协议并注册
                </van-button>
                <p class="xieyi">我已阅读接收<span>《大麦网会员服务协议》</span><span>《隐私专项条款》</span><span>《大麦网订票服务条款》</span>并同意自动注册成会员</p>
            </div>
                <router-link to="/login" class="a-register">已有账号？</router-link>
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
            password2:'',
            icon:'//gw.alicdn.com/tfs/TB1QfeUQAvoK1RjSZFDXXXY3pXa-300-138.png'
        }
    },
    methods: {
        validator(val){
            if(val !== this.password){
                Toast.fail('两次密码不一致！');
                return false;
            }
        },
        onSubmit(values) {
            // console.log('submit',values);
            this.$axios.post('/api/users/register',{
                username : this.username,
                password : this.password
            }).then((res)=>{
                // console.log(res.data);
                //对请求回来的数据进行判断
                if(res.data.code == 0){
                    Toast.success('恭喜你，注册成功！');
                    this.$router.push('/login');
                }
                else{
                    Toast.fail('注册失败，请重新注册');
                }
            }).catch((err)=>{
                    Toast.fail('注册失败，请重新注册');
                })
        }
    }
};
</script>

<style scoped lang="scss">
*{margin: 0; padding: 0;}
#register{
    position: relative;
    top: 0.5rem;
    left: 0;
}
.RegisterForm{
    width: 3.3rem;
    height:2.7rem;
    border-radius:0.15rem ;
    padding: 0.2rem 0.1rem 0.1rem 0.1rem;
    margin: 0.1rem auto;
    .ipt{
        padding-top:0.2rem ;
        border-bottom: 1px solid  #dddddd;
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
.btn{
    margin:0.2rem auto ;
    p{
        width: 3.25rem;
        height: 0.35rem;
        text-align: left;
        span{
            color: #ff1268;
        }
    }
}
.damai{
    margin: 0 auto;
    border-radius: 0.15rem;
    width: 1.2rem;
    background-color: #FF44AA;
    border: none;
}
.btn-login{
    display: inline-block;
    width:3.25rem;
    border-radius: 0.07rem;
    border:none ;
    background-image: -webkit-linear-gradient(left,#ff4aae,#ff1268);
    opacity: 0.5;
}
body .xieyi{
        font-size: 12px !important;
}
.a-register{
    float: right;
    margin-right: 0;
}
</style>