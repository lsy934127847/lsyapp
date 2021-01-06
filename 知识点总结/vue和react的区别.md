
从vue 数据双向绑定  和react 的单向数据流


单项数据流的体现
react 通过setState 修改状态，更新dom，，

vue 数据双向绑定的体现
vue   通过直接修改声明式变量,更新dom
      

举个例子  
vue 中的input 框  使用v-model 实现数据的双向传递
v-model 是基于 value 属性和 oninput 事件实现的,当我们在input输入内容时，将value值直接赋值给了声明式变量,实现了从view到model的数据传递


想让当数据变化，视图页发生变化的方式有
