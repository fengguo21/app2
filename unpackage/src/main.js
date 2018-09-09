/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import MintUI from 'mint-ui'
import {
    Toast
} from 'vue-ydui/dist/lib.rem/dialog';
import 'mint-ui/lib/style.css'
import './styles/iconfont.css';
import './styles/style.css';
import './res/font/iconfont.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
// import {Icons} from 'vue-ydui/dist/lib.rem/icons';
/* 使用px：import {Icons} from 'vue-ydui/dist/lib.px/icons'; */
import router from './router'
import index from './views/index.vue'
import store from './vuex/store';
import * as filters from './filters/filters'



Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.use(VueRouter)
Vue.use(YDUI);
Vue.use(MintUI);
// Vue.component(Icons.name, Icons);

import loading from './common/loading/loading'
// import message  from './common/message/message'
// import showImg  from './common/showImg/showImg'
// import dialog from './common/dialog/dialog'
//原型扩展 全局方法
Vue.prototype.$loading = loading;
// Vue.prototype.$message = message;
// Vue.prototype.$showImg = showImg;
// Vue.prototype.$dialog = dialog;

// 扩展原生接口
document.addEventListener("plusready", function () {
    console.log(
        "所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
    );
    if (plus) {
        console.log("plus init success------------------");
        // 监听收到通知
        plus.push.addEventListener(
            "receive",
            function (msg) {
                console.log(msg);
                // 分析msg.payload处理业务逻辑
                let payload = eval("(" + msg.payload + ")");
                if (payload.link) {
                    routerApp.$router.push(payload.link);
                }
            },
            true
        );
        // 监听点击通知
        plus.push.addEventListener(
            "click",
            function (msg) {
                console.log(msg);
                // 分析msg.payload处理业务逻辑
                let payload = eval("(" + msg.payload + ")");
                if (payload.link) {
                    routerApp.$router.push(payload.link);
                }
            },
            true
        );
        // android返回事件
        plus.key.addEventListener("backbutton", function () {
            // 返回上一页
            if (history.length <= 2) {
                plus.runtime.quit();
            }else{
                history.go(-1)
            }
        });
        console.log("plus addEventListener success------------------");
        // 扩展 plus 原型
        Vue.prototype.$plus = plus;
        console.log("plus push success------------------");
        // 封装原型通用方法
        Vue.prototype.$toast = function (message, options) {
            plus.nativeUI.toast(message, options);
        };
    }
    console.log(
        "plus110 init success. Now OS is " + plus.os.name + "------------------"
    );
});
// 在组件中引用： import Vue from 'vue' 
// 通过Vue原型使用扩展：Vue.prototype.$plus.***
// 具体API使用参考官方文档，http://ask.dcloud.net.cn/docs#//ask.dcloud.net.cn/article/88

const routerApp = new Vue({
    store,
    router,
    render: h => h(index)
}).$mount('#app');

//路由拦截器判断是否登录，如果没有登录，则返回登录菜单，并提示用户登录
router.beforeEach((to, from, next) => {
    if (to.path == "/login") {
        next();
    } else {
        if (!window.localStorage.employeeId) { //在此处判断是否登录了 
            Toast({
                mes: '请先登录！',
                timeout: 1500
            });
            next({
                path: '/login'
            });
        } else {
            next()
        }
    }

})