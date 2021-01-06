<template>
    <div>
         <h1>音乐详情页</h1>
    </div>
</template>

<script>
    export default {
    //  使用props来接收路由中的参数
        // props:{
        //      id:{
        //          type:String,
        //          required:true
        //      }
        // },

        mounted(){
          let id = this.$route.params.id  
        //   根据id 来调接口获取音乐的详细信息
        // console.log('音乐id',id)
        //   let id = this.id
          console.log('音乐id',id)
        }
    }
</script>

<style lang="scss" scoped>

</style>