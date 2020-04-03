// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './models/rem.js'
// 引入vconsole
import VConsole  from "vconsole"
//var vConsole = new VConsole();
// 引入vue
import Vue from 'vue'
import "./utils/vant.js"
import App from './App'
import './assets/styleSheet/css/reset.css'
import './assets/styleSheet/css/common.css'
import router from './router'
import store from './store'

//引入数据请求
import {ccbskObj} from './utils/ccbsk'
//引入http
import http from "./utils/http"
//引入loading组件
import loading from './view/mod/loading/loading'
Vue.use(loading)

Vue.prototype.$ccbskObj=ccbskObj
Vue.prototype.$http=http

//开启loading方法
Vue.prototype.$openLoading=function(text){
    this.$store.commit('showLoading', true)
    this.$store.commit('loadTextChange', text?text:"正在加载")
}
//关闭loading方法
Vue.prototype.$closeLoading=function(){
    this.$store.commit('showLoading', false)
}

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
