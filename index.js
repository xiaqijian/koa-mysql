const Koa = require('koa')
const config = require('./config/default')
const mysql = require('./mysql')

const app =  new Koa()


// app.use(json())
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