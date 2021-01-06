
# 安装
1. 安装redux  react-redux
npm install redux -S
npm install react-redux -S
2. 引入相关资源
 import {createStore,combineReducers,applyMiddleware} from  'redux'   //  用以创建store对象
 import thunk from 'redux-thunk'                                      //  解决异步action
 import {Provider} from 'react-redux'                                 //  根组件暴漏state
 import {useSelector,useDispatch} from 'react-redux'                  //  在组件中使用和更新 state
#redux 
 * 核心概念
1. 单一数据源,单向数据流,state是只读的,只能使用纯函数执行修改
2. Redux 提供可预测化的状态管理，让 state 的变化变得可预测
3. Redux 在复杂应用和庞大系统时优秀的扩展能力,它可以用 action 追溯应用的每一次修改.如录制用户会话并回放所有 action 来重现它。



#为什么外部数据的基本都要走redux
1. 可能原因 单一数据源


#具体使用
 1. 创建store对象
 ```javascript
 // 引入相关Api
 import {createStore,combineReducers,applyMiddleware} from  'redux'
 // 引入中间价,解决异步action,
 import thunk from 'redux-thunk'
 // dispatch 触发所有的reducer,进行判断匹配,但reducer又可以分工管控各自的state的更新
    const rootReducer = combineReducers({
        musicListReducer,
        aboutReducer,
    
    });
// 创建store对象,用于分发任务,更新state|dispatch(action)方法|,存储数据|getState()获取数据|,监听数据变动|subscribe(()=>{})|
 let store = createStore(rootReducer,applyMiddleware(thunk))
 ```
 2. 使用Store中的数据和更新数据
 (方式一)
  ```javascript
  // 引入组件
  import {Provider} from 'react-redux'
  // 引入创建的store对象
  import store from './store/index'
 // 暴露store对象  {store:state}
    <Provider store={store}> 
        <About></About>
        <Music></Music>
    </Provider>
 // 组件中引入hooks Api
 import {useSelector,useDispatch} from 'react-redux'
 // 获取 musicListReducer 的 state
   const music = useSelector(store=>store.musicListReducer)
 // 派发任务
   const dispatch = useDispatch()
   dispatch(action)
 // 注意:action 应是一个普通对象
 //  当派发一个异步action时,应按照如下写法
 function musicListAction(params){
    return function(dispatch){
        fetchQqMusic(params).then(res=>{
            dispatch({
                type:'ajax',
                payload:res.data.data.song.list
            })
        })
    }
  
}
  ```
(方式二)
```javascript
 // 组件中引入store对象
 import store from './store/index'
 // 获取state
 store.getState()
 // 更新state
 store.dispatch(action)  // action 是一个对象
 // 监听数据变化
 store.subscribe(()=>{console.log('数据变化了')})
```

