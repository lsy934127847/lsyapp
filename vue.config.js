
// 只要修改了这个配置文件，都要重启项目
module.exports = {
    devServer: {
        // 用代理的方式来解决浏览器同源策略对ajax的限制
      proxy: {
        '/soso': {

            // 目标远程服务器
          target: 'https://c.y.qq.com',
     
          // 允许改变 域 
          changeOrigin: true 
        },
        '/api':{
          // 老师的ip 内网地址
          target: 'http://10.20.158.29:9000',
          changeOrigin: true 
        }
   
      }
    }
  }