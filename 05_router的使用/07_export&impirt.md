   
```javascript
    // javascript模块规范有两种：CommonJS 和 AMD
    // AMD是”Asynchronous Module Definition”的缩写，意思就是”异步模块定义”。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。
    // 所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
    // CMD与AMD区别
    // AMD和CMD最大的区别是对依赖模块的执行时机处理不同，而不是加载的时机或者方式不同，二者皆为异步加载模块。

    // AMD依赖前置，js可以方便知道依赖模块是谁，立即加载；

    // 而CMD就近依赖，需要使用把模块变为字符串解析一遍才知道依赖了那些模块，
    // 这也是很多人诟病CMD的一点，牺牲性能来带来开发的便利性，实际上解析模块用的时间短到可以忽略。

    // ES6标准发布后，module成为标准，标准使用是以export指令导出接口，以import引入模块，但是在我们一贯的node模块中，
    // 我们依然采用的是CommonJS规范，使用require引入模块，使用module.exports导出接口。
```
#es6标准,模块化管理

1.html文件使用时,要在script 标签上指定 type为module
2.要在服务下打开html文件

export 声明式导出  默认导出   import  声明式导入 默认导出



#声明式
```javascript
// 1. export 声明式导出方式一 import 声明式引入
export var a = 20
export var obj = {}
export var fn =  funcition(){}
export fucition bn(){}

import {a,obj,fn,bn} from './mian.js'  
//  注意点:必须按照如上方式书写,import 对象中的变量可以只写一个或多个,但变量名要对应

// 2. export 声明式导出方式(二) import 声明式引入
export {a,obj,fn,bn}
import {a,obj,fn,bn} from './mian.js' 
//  注意点:必须按照如上方式书写,import 对象中的变量可以只写一个或多个,但变量名要对应
```

#默认式
 <!-- 注意点:默认导出一个模块只能有一个,声明式导出可以有多个 -->
```javascript
 fucition bn(){}
 var fn =  funcition(){}
 var obj = {}
 var a = 20
export default {
      //es6 写法 属性和变量一样,省略
    fn:fn,
    obj,
    a:a
}
export default fn
import myobj from './mian.js'  
// 注意点:默认导出,和引入保证了宏观上的一致
```