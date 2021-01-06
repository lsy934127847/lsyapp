<template>
    <div>
        <h1>首页</h1>
        <button @click="skipToUser">编程式 跳转到个人中心</button>

        <!-- 声明式路由的三种写法 -->
        <router-link to='/userdskflsdfkjsldfj' tag="div">path 声明式 路由跳转</router-link>
        <router-link to='/u' tag="div">路由别名 声明式 路由跳转</router-link>
        <router-link :to='{name:"me"}' tag="div">路由命名 声明式 路由跳转</router-link>
        <hr>
            <el-button>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
    </div>
</template>

<script>

    export default {
        mounted(){
            console.log('$route',this.$router)
            console.log('$router',this.$router)
        },
        data:function(){
            return {
               msg:'我是home'
            }
        },
        methods:{
            skipToUser(){
                // 使用路由别名
                // this.$router.push('/u')
                // 使用path
                //  this.$router.push('/userdskflsdfkjsldfj')
                // 使用路由命名
                 this.$router.push({name:'me'})
            }
        }
    }
</script>


<style lang="css" scoped>
/* scoped 表示只当前style起作用 */
 
</style>

