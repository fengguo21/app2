# wei-h5
> 
本工程适用于基于 Vue.js1.0 + vue-router + webpack + dyui 的项目，已经将 dyui 配置完成，只需要按步骤初始化即可。

## 安装
```bush
// 安装前请先确保已安装node和npm
// 需要提前在全局安装webpack和webpack-dev-server,如果已安装请忽略
npm install webpack -g
npm install webpack-dev-server -g

// 安装成功后,再安装依赖
npm install
```
## 运行
### 开发环境
```bush
// 注意首次使用需要执行下面的init命令来生成入口html文件,以后不用再执行
npm run init
npm run dev
```
### 生产环境(打包)
```bush
npm run build
```
### 访问
在浏览器地址栏输入[http://127.0.0.1:8080](http://127.0.0.1:8080)

###整体布局（列表页）
main.vue分为四部分：头部（标题，图标），底部（导航），左边菜单（点击头部图标打开），中间主体（路由）内容（<router-view></router-view>）
centercontent.vue组件，用于列表页主体内容布局使用，包括：
1.搜索区——固定搜索框（发出"query"事件）、刷新（发出"refresh"事件）、更多搜索项（可选，由变量showMore控制，可打开右侧搜索条件框）、额外的搜索条件（slot="search"一般用不到）
2.列表区域（slot="content"）
3.右侧搜索条件框
4.loading界面（由变量loading控制）
