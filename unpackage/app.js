var path = require('path')
var express = require('express')
var favicon = require('serve-favicon')
// var logger = require('morgan')
// var cookieParser = require('cookie-parser')
// var bodyParser = require('body-parser')
var proxyMiddleware = require('http-proxy-middleware')

var app = express()

app.use(favicon(path.join(__dirname, 'dist/static','favicon.ico')))

// app.use(logger('env'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser())

//端口号
var port = 3007
var proxyTable = {
    '/front': {
        target: 'http://192.168.1.142',
        pathRewrite: { '^/front': '/front' },
        changeOrigin: true
    }
}

// proxy api requests 反向代理API 在config 中配置即可
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// h5的 history模式
app.use(require('connect-history-api-fallback')())

app.use(express.static(path.join(__dirname, 'dist')))

var uri = '192.168.1.142:' + port

console.log('> Starting dev server...')
console.log('> Listening at ' + uri + '\n')

app.listen(port, '192.168.1.142')
