# element-ui 组件库的使用

1.下载element-ui 包  npm install element-ui -S



#问题:使用element-ui框架时,默认样式无法满足需求,需要重新配置样式，但有时无法覆盖掉默认样式

1.原因:权重问题,scoped,其他

2.解决: a.去掉 scoped,此时该样式会污染全局样式，可以把它放在公共的css里面
        b.加 !important  尝试是否是权重问题


#问题:在Vue原型对象上添加的方法和属性,在VueComponent子组件 实例对象可以访问到

1.结论:Vue 原型对象出现在了 VueComponent子组件 实例对象 上的原型链上
2.验证: 注册 全局 和 局部 子组件，在子组件 中 判断  this instanceOf Vue  为true
3.结论:无论是全局 还是 局部 子组件,Vue 原型对象都出现在了其子组件实例对象的原型链上,故可以通过 子组件实例对象.属性  访问Vue 原型对象的属性和方法


#问题:instanceof 判断方法
1. A instanceOf  B
2. 若 B 的原型对象 出现在了 A 的原型链上,所以 B 通常是一个构造函数 ,A 是一个对象


#调登录接口

第一步:把token存储在localstorage,代码如下
       localStorage.setItem('token',res.token)


#token的含义

1、Token的引入：Token是在客户端频繁向服务端请求数据，服务端频繁的去数据库查询用户名和密码并进行对比，判断用户名和密码正确与否，并作出相应提示，在这样的背景下，Token便应运而生。

2、Token的定义：Token是服务端生成的一串字符串，以作客户端进行请求的一个令牌，当第一次登录后，服务器生成一个Token便将此Token返回给客户端，以后客户端只需带上这个Token前来请求数据即可，无需再次带上用户名和密码。

3、使用Token的目的：Token的目的是为了减轻服务器的压力，减少频繁的查询数据库，使服务器更加健壮。

#token的使用

token是后端根据用户登录信息生成的加密字符串,用于鉴权，识别用户身份,他比cookie在更安全

根据如下后端返回的token显示

token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 . eyJleHAiOjE2MDU5NTYwODMsImRhdGEiOnsidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiYWJjMTIzIn0sImlhdCI6MTYwNTM1MTI4M30  .   K6V4uT47mEwwnRi-ojoqdOFxCrvzdK3yuK9GVVhIGvc"

token是由一段字符串组成,字符串中通过两个 点(.),将字符串分成了三部分,第一部分表示加密算法 第二部分表示记录的信息，比如用户名和密码,第三部分表示暗号

#前端如何携带token给后端

在请求拦截器中添加如下代码
config.headers.Authorization = localStorage.getItem('token')
在响应拦截器中
当token失败(后端验证失败时),后端会提示前端token失败,前端可以重定向到登陆页

#






