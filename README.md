# koa-mysql

这个教程不管node，express，koa都可以用下面方法连接，这里用koa做个参考

新建文件目录，我是这样子的
--
![image.png](https://upload-images.jianshu.io/upload_images/1379609-df09edd090593a9b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

很多教程都没有涉及到版本，所以让很多初学者，拷贝他的代码，出现错误问题
我的版本：
```
 "dependencies": {
    "koa": "^2.6.2",
    "mysql": "^2.16.0"
  }
```


1.设置配置文件
--

```
// default.js
// 设置配置文件
const config = {
    // 启动端口
    port: 3000,
  
    // 数据库配置
    database: {
      DATABASE: 'ceshi',
      USERNAME: 'root',
      PASSWORD: '1234',
      PORT: '3306',
      HOST: 'localhost'
    }
  }
  
  module.exports = config

```

2.连接数据库
--

```
// mysql/index.js

var mysql = require('mysql');
var config = require('../config/default.js')

var pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE
});


class Mysql {
    constructor () {

    }
    query () {
      return new Promise((resolve, reject) => {
        pool.query('SELECT * from ceshidata', function (error, results, fields) {
            if (error) {
                throw error
            };
            resolve(results)
            // console.log('The solution is: ', results[0].solution);
        });
      })
       
    }
}

module.exports = new Mysql()

```

3.设置服务器
--

```
// index.js
const Koa = require('koa')
const config = require('./config/default')
const mysql = require('./mysql')

const app =  new Koa()

app.use(async (ctx) => {
    let data = await mysql.query()
    ctx.body = {
        "code": 1,
        "data": data,
        "mesg": 'ok'
    }
    
})

app.listen(config.port)

console.log(`listening on port ${config.port}`)

```
4.启动服务器，去浏览器访问
--

先去数据库添加点数据

```
node index.js
```
打开浏览器localhost:3000, 然后你就会看到以下数据，自己添加的数据查询出来了

![image.png](https://upload-images.jianshu.io/upload_images/1379609-ec8ecf1e60fbf243.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后其他相关操作，可以看mysql相关API，我下次也会分享出来


首发于微信公众号：node前端

不妨关注一下，我们一起学习