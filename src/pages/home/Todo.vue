<template>
    <div>
         <h1>TodoList</h1>
         <h1 v-text='msg'></h1>
         <hr>
         <div>
             <input type="text" v-model="task" @keyup.enter="confirm"><br>
             <div>总共有 <span v-text="total"></span> 条任务</div>
             <div v-for="item in list" :key="item.id">
                 <span v-text="item.id"></span>
                  <span>-------</span>
                   <span v-text="item.task"></span>
                   <span @click='remove(item)'>删除</span>
             </div>
         </div>
    </div>
</template>

<script>
import { mapGetters,mapState,mapMutations } from 'vuex'
    export default {

        data:function(){
            return {
               task:''
            }
        },
        mounted(){
            console.log('store',this.$store)
           
        },
        methods:{
            ...mapMutations('todoModule',['addTask','delTask']),
            confirm(){
                // this.$store.commit('addTask',this.task)
                this.addTask(this.task)
                this.task=""

            },
            remove(item){
                // this.$store.commit('delTask',item.id)
                this.delTask(item.id)
            }
        },
        computed:{
             ...mapGetters('todoModule',['total']),
             ...mapState('todoModule',['list']),
             ...mapState('todoModule',['msg'])
        }

    }
</script>

<style lang="scss" scoped>

</style>