<template>
    <div class="goodlist">
       <h1>商品列表</h1>
<div class="row-parent">
    <el-row align="middle" type="flex">
        <!-- 栅格系统总共24等分 ， -->
     <el-col :span="3" >
         <div class="search"> 名称搜索:</div>
         
      </el-col>
      <el-col :span="5" >
         <el-input 
         clearable
         size="small"
         v-model="filter.searchText" placeholder="请输入内容" @change="textFilter"></el-input>
      </el-col>

       <el-col :span="2" >
          <span class="cates">品类筛选:</span>
      </el-col>

       <el-col :span="4" >
          <CateSelect @change="cateFilter" clearable size="mini" v-model="filter.cate"></CateSelect>
      </el-col>

      

     

      <!-- <el-col :span="18">111</el-col> -->
      <el-col :span="6" >
          <el-button type="primary" @click="skipToAdd" size="mini" round>商品新增</el-button>
      </el-col>
    </el-row>
    <div class="two">
                    <el-row align="middle" type="flex">
                <el-col  :span="2" >
                <div class="qf-filter-label">日期筛选</div>
            </el-col>
                <el-col  :span="4">
                            <el-date-picker
                                size="mini"
                                v-model="filter.date"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                >
                            </el-date-picker>
                </el-col>
            </el-row>
    </div>
 
</div>


    
       <div class="qf-good-list">
            <el-table
                :data="good.list"
                border
                style="width: 100%">

                <el-table-column
                prop="date"
                label="商品信息"
                align="center"
                width="150">

                  <template slot-scope="scope">
                    <div class="qf-img">
                       <img :src="$img.imgBaseUrl+scope.row.img" alt="img">
                       <div v-text="scope.row.name"></div>
                    </div>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>

                </el-table-column>

                <el-table-column
                prop="desc"
                label="商品描述"
                align="center"
                width="400">
                </el-table-column>

                <el-table-column
                prop="price"
                align="center"
                width="100"
                label="商品价格">
                </el-table-column>

                <el-table-column
                prop="hot"
                align="center"
                 width="100"
                label="是否热销">
                 <template slot-scope="scope" >
                      <span v-text="scope.row.hot?'热销':'否'"></span>
                  </template>
                </el-table-column>

                <el-table-column label="操作"  >
                      <template slot-scope="scope"  >
                        <el-button
                          size="mini"
                          @click="editGood(scope.row)">编辑</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="delGood(scope.row)">删除</el-button>
                      </template>
                </el-table-column>
                      

            </el-table>

            <!-- 分页器 -->
            <div class="pagination">
                <el-pagination
                    @size-change="sizeChange"
                    @current-change="pagechange"
                    :current-page="filter.page"
                   
                :page-sizes='[2,5,10,20,100]'
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="good.total"
                    :page-size='filter.size'>
                </el-pagination>
            </div>
        
       </div>
    </div>
</template>

<script>
import { CateSelect } from "@/components/";

export default {
  components: {
    CateSelect
  },
  data() {
    return {
      data() {
        return {
          pickerOptions: {
            shortcuts: [
                 {
                text: "最近三天",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近一周",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近一个月",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近三个月",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit("pick", [start, end]);
                }
              }
            ]
          },
          value1: "",
          value2: ""
        };
      },

      good: {
        total:0,
        list:[]
      },
     
      //    用于筛选
      filter: {
        searchText: "",
        cate: "",
        date:"",
        size:2 ,
        page:1,
        hot:true,
        text:''
      }
    };
  },
  mounted(){
     this.initTable()
  },
  methods: {
    initTable(){
      // if(!page){
      //            this.filter.page=1
      // }
       this.$http.fetchGoodList(this.filter).then(res=>{
        console.log('商品列表',res)
        this.good = res
      })
    },
    skipToAdd: function() {
      this.$router.history.push("/good/add");
    },
    // 每页显示多少条哦
    sizeChange(val){
        console.log('sizeChange',val)
        
        this.filter.size = val
      this.filter.page = 1
          this.initTable()
    },
    // 当页码发生变化
    pagechange(val){
        console.log('pagechange',val)
       this.filter.page = val 
        this.initTable()
    },
    delGood(item){
        console.log('item',item)
        this.$confirm(`你确定要删除当前商品吗？${item.name}`, '危险', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        //  调接口删除商品
        this.$http.fetchGoodDel({id:item._id}).then(()=>{
            this.initTable(true)
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
      editGood(item){
      console.log('item',item)
    },
    // 搜索
    textFilter(val){
      console.log('搜索',val)
      this.filter.text = val
        this.initTable()
    },
  // 品类筛选
    cateFilter(){
    this.initTable()
    }
  }
};
</script>

<style lang="scss" scoped>
.el-button {
  margin-left: 200px;
  //   margin-bottom: 20px;
}
h1 {
  margin-bottom: 20px;
}
.goodlist {
  font-size: 14px;
}
.row-parent {
  margin-bottom: 20px;
}
.cates {
  margin-left: 40px;
}
.search {
  text-align: center;
}
.two{
    margin-bottom: 20px;
    margin-top:20px;
}
.pagination{
    margin:20px 0px;
    text-align: right;
}
.qf-img{
  width:100px;
  height:100px;
  margin:0 auto;
  img{
    display: block;
    margin:0 auto;
    width:50px;
  height:50px;
  
  }
}
</style>