

1. 在类组件同一个生命周期方法书写了很多不同的逻辑的代码,代码难以维护
   例如:在组件被挂载的生命周期中,可能注册监听事件,可能发送网络请求

2. 常用的hooks
 
```javascript
useContext
import React,{createContext,useContext} from 'react'
const UserContext = createContext({})
const ColorContext = createContext({})

//    父组件 生产者 生产数据
      <UserContext.Provider value={{name:'lsy',age:25}}>
                <About></About>    
      </UserContext.Provider>
      
    <ColorContext.Provider value={{name:'ls',age:65}}>
        <Home></Home>    
    </ColorContext.Provider>
// 子组件消费数据
  // 获取生产者生产的数据
    const user = useContext(UserContext)      //  user:{name:'lsy',age:25}
    const color = useContext(ColorContext)    //  color:{name:'ls',age:65}  
```
```javascript

// useCallback  性能优化
// useMemo    性能优化
// UseRef  获取dom对象或者组件实例

// useLayoutEffect : DOM还未渲染到屏幕上就会执行
// useEffect   :  DOM 已经渲染到页面上了  才执行  操作dom会有闪屏的情况
// useLayoutEffect   比 useEffect 在挂载和更新阶段先执行    在卸载阶段后执行

```