import Vue from "vue"
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/AccMngt",
            name: 'AccMngt',
            component: resolve => require(['@/view/AccMngt.vue'], resolve)
        },
        {
            path: "/SdkActivate",
            name: 'SdkActivate',
            component: resolve => require(['@/view/SdkActivate.vue'], resolve)
        },
        {
            path: "/SdkActivatCon",
            name: 'SdkActivatCon',
            component: resolve => require(['@/view/SdkActivatCon.vue'], resolve),
            meta: {
                keepAlive: true
            }
        }, {
            path: "/AccMngtCon",
            name: 'AccMngtCon',
            component: resolve => require(['@/view/AccMngtCon.vue'], resolve),
        },
        {
            path: "/FaceRecog",
            name: 'FaceRecog',
            component: resolve => require(['@/view/FaceRecog.vue'], resolve)
        },
        {
            path: "/Contract",
            name: 'Contract',
            component: resolve => require(['@/view/Contract.vue'], resolve)
        }

    ]
})


