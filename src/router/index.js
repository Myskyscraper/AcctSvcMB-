import Vue from "vue"
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes:[
        {
            path:"/Sdkactivat",
            name:'Sdkactivat',
            component: resolve =>require(['@/view/Sdkactivat.vue'], resolve)
        }, {
            path:"/levalChange",
            name:'levalChange',
            component: resolve =>require(['@/view/levalChange.vue'], resolve)
        }, {
            path:"/signTreaty",
            name:'signTreaty',
            component: resolve =>require(['@/view/signTreaty.vue'], resolve)
        },{
            path:"/faceRecog",
            name:'faceRecog',
            component: resolve =>require(['@/view/faceRecog.vue'], resolve)
        },
        {
            path:"/walletMain",
            name:'walletMain',
            component: resolve =>require(['@/view/walletMain.vue'], resolve)
        }
        
    ]
})