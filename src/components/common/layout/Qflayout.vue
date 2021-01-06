<template>
    <div class="qf-layout">
        <el-container>
            <el-aside width="200px">
                <QfAside> </QfAside>
            </el-aside>
            <el-container>
                <el-header>
                    <QfHeader> </QfHeader>
                </el-header>
                <el-main>
                    <QfMain> </QfMain>
                </el-main>
            </el-container>
        </el-container> 
    </div>
</template>

<script>
export default {
    components:{
        QfAside:()=>import('./QfAside.vue'),
        QfHeader:()=>import('./QfHeader.vue'),
        QfMain:()=>import('./QfMain.vue')
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';
//   $color:red;

  .qf-layout{
      height:100%;
      background-color: $color;
      .el-container{
          height:100%
      }
  }
.qf-mian{
    background-color: rgba(45,45,45,1);
    height:100%;
    color:white;
    // position: relative;
    // top:20px;
    // bottom: 0;
    // right:0;
    // top:0;
    // overflow: auto;
}

.qf-Aside{
    background-color: rgba(45,45,45,1);
    height:100%; 
     color:white
}
.qf-header{
     background-color: rgba(45,45,45,1);
    height:100%; 
     color:white;
     text-align: center;
     line-height: 100px;
}
.el-header{
    padding:0;
    height:100px !important;
}


</style>