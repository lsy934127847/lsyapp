
#promise 相关理解
1.Promise对象ES6新增，可以实现用同步的流程表示异步的操作，可以解决回调地狱的问题
2.同步体现在在使用then方法时，看似全是同步的链式调用，但实际上，then中的回调却是异步的
2.最大的特点是每一个promise实例对象有他自己的状态和结果,，状态一旦发生更改，不可逆转,
3.promise状态是可监听的，是可以人为控制的，是由在创建promise实例时传入的回调中 的两个参数决定,
4.在使用promise相关方法的时候，确认好每一次返回promise对象的 最终 状态和结果，是进行链式调用的关键，是进行链式调式用时判断回调能否执行，回调中传递的实参是什么 的关键

#Promise   then 方法
1.then方法, 立即 返回一个promise对象
2.then方法需确认大致三点
  a.回调能否执行
  b.回调中 接收了什么实参
  c.回调中返回的是否是promise对象


3.接下来具体探讨一下基于以上3点，确认then方法返回的promise对象的最终状态和结果 (只考虑then方法只有一个回调的情况)

第一种情况 回调不执行(回调不执行可能两种情况，监听了失败的状态，状态还未发生改变)(只考虑监听了失败了状态)
    a.继承上一个promise对象的状态和结果

第二种情况 回调执行
    1.返回基本数据类型和引用数据类型
         a.状态[[PromiseState]]:继承上一个promise的状态
         b.结果[[PromiseResult]]:返回值
    2.返回了一个promise对象
         a.状态和结果 都和 返回的promise对象的状态保持一致

4.then方法中回调函数属于 微任务,是异步的，并且要监听成功状态的改变


#promise   catch 方法
1.catch方法立即返回一个promise对象
2.catch方法中回调函数属于 微任务,是异步的，并且要监听失败状态的改变

#Promise   all 方法
语法 p  = Promise.all([p1,p2,p3])
1.all方法接收一个数组,数组中的每一项是promise实例对象
2.返回值是一个promise对象
   a.只有数组中所有的promise实例对象的最终状态是成功,返回的promise实例对象的状态才是 成功
   b.返回的promise对象的结果是一个数组,数组中的每一项是 all中传递的数组中的每一个promise对象成功的结果,
   c.只要数组中有一个promise对象的状态是失败,返回的promise实例对象的状态 就是失败
   d.返回的promise对象的结果 第一个返回的失败状态 promise的结果

#Promise  race 方法
语法 p = Promise.race([p1,p2,p3])
1.返回值是一个promise对象
  a.返回值的状态是由数组中第一个状态发生改变的promise对象决定的,最终结果也是有第一个状态发生改变的promise对象决定的

#手写promise.

主要工能:监听状态的改变,并简单实现了then方法,且可以得到成功状态传递的结果,暂不考虑then方法返回的是什么
主要实现思想: 依据官方promise 对象的特点
1.监听状态改变,只有成功回调执行,状态才会有pending变为fufilled,只有失败回调执行,状态才会由pending变为rejected
2.then方法 中的回调函数监听了成功状态的执行,只有成功状态执行,then方法中回调才会执行

```javascript
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

 // MyPromise 功能 : 监听MyPromise状态和结果(status,result),其中then 方法回调的执行同样能达到监听,且可以得到promise的结果 暂不考虑then中的返回值
    class MyPromise {
        constructor(fn) {

            // 判断是否传入了一个函数
            if (!(typeof fn === 'function')) {
                console.log('请传入一个函数')
                return
            }

            // 定义初始状态
            this.status = PENDING
            // 定义结果
            this.result = undefined

            // 传递then中回调，以便可以在任何成功回调中执行此函数，达到监听功能 ,
            this.resolveCallBack = null

            // 调用传入的函数
            fn(this.resolve, this.reject)
        }

        // 
        // 定义成功回调函数 若使用箭头函数，无法将该方法添加到原型上，只会添加到实例上
        resolve = (res) => {
            console.log('成功回调执行了')
            // 修改状态为成功
            this.status = FULFILLED
            // 传递结果
            this.result = res
            if (this.resolveCallBack) {
                this.resolveCallBack(this.result)
            }
        }
        // 定义失败回调 函数
        reject = (rej) => {
            console.log('失败回调执行了')
            // 修改状态为失败
            this.status = REJECTED
            this.result = rej
        }
        // 定义then 方法,只有一个参数的情况，监听状态的改变,
        then(fn) {

            // 暂不考虑then的返回值的情况
            // 判断是否传入了一个函数
            if (!(typeof fn === 'function')) {
                console.log('请传入一个函数')
                return
            }
            // 同步情况,判断立即执行
            if (this.status === FULFILLED) {
                fn(this.result)
            } else if (this.status === PENDING) {
                // 异步情况，传递给成功回调达到监听  
                this.resolveCallBack = fn
            }
        }
    }
```

  