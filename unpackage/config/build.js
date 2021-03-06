//检查版本
require('./check-versions')()

//各种模块
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('./config')
//声明打包环境 生成
process.env.NODE_ENV = config.build.env
//生成配置文件
var webpackConfig = require('./webpack.prod.config')

var spinner = ora('building for production...')
spinner.start()

rm("./../dist/*",err=>{
    if (err) throw err
    console.log(chalk.cyan('\n  Clean old.'))
})

webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: true,
        chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
    ))
})
