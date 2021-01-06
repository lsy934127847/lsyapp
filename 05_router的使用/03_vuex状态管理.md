# 状态管理在vue-cli的实现步骤


#创建一个vuex实例对象

```javascript
           var store = new Vuex.Store({
    //    state 属性:专门用于保存 共享数据 的
        state:{
           msg:'我是共享数据'
        },
        
    // mutations:用于保存 修改共享数据 的方法
    
        mutations:{
            fnMuta:fucition(state,payload){
                // this 指向当前store 对象
                state.msg="我是修改后的数据"
                }
        }
    // getters 类似于vue实例中的计算属性
    // 基于state中的声明式变量进行缓存的,只要其 依赖的 声明式变量发     生 改变，就会调用该函数
    // 
        getters:{
             total(state){
            //   this 指向window 
            // state 和 上述面state 保持一致
        }
    },
     // actions是专门与后端API打交到的
          actions:{
              fnApi(store,payload){
            //  store 指向当前创建的vuex实例
            //  不建议在此处修改数据，将数据提交到mutations的fnMut      的方法中,fnMuta使用第二个参数payload接收,在       mutations的方法中进行修改数据操作
                store.commit('fnMuta',"参数")
              }
          },
    // 模块话管理数据
          modules:{
              音乐模块:{state:{},getters:{},mutations:{},actions:{}  }
              购物模块:{state:{},getters:{},mutations:{},actions:{}    }
          }
    })
```

#在组件中访问和使用vuex中的数据和方法
引入 import { mapGetters,mapState,mapMutations,mapActions } from 'vuex'
```javascript
//  1.组件实例对象中:
    //    a.this.$store.state.msg 访问数据
    //    b.this.$store.commit('mutations中的方法名','参数') 访问mutations中的方法,并传递参数，方法用第二个参数接收payload接收

//  2.将modules中的模块 中的 数据和方法 映射到组件中,相当于将数据方法直接写在了组件的属性中
    //  a.在methods中映射mutation和actions中的方法，
    //   语法：
       methods:{ 
           ...mapMutations(音乐模块',['mapMutations的方法1','mapMutations的方法2']) 
           ...mapAction(音乐模块',['actions的方法1','actions的方法2']) 
           } 
        //  访问：this.mapMutations的方法1
    //  b.在computed中映射state中的数据和getters
    //  语法：
        computed:{
            ...mapGetters('音乐模块',['getters的方法1','getters的方法2',]),
            ...mapState('音乐模块',['stated的数据1','stated的数据2']),
        }
        // 访问：this.getters的方法1
```
#将vuex实例对象挂载到vue实例对象中
```javascript
  new Vue({
      store:store
  })
//   1.挂载到vue实例后，在其根实例组件以及子孙组件实例对象中会自动生成 $store 属性,指向了vuex实例对象
//   2.在任何组件中都可以通过 this.$store.state 访问数据 
```
#将vuex 状态管理的好处

1.保存从服务端接收的数据,不需要重复多次提交请求
2.组件使用共享数据更加方便，易于开发和后期维护
3.能够高效的实现组件之间的数据共享，提高开发效率
4.存储在vuex中的数据是响应式的，能够实时保持数据和页面的同步