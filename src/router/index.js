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
            path: "/SdkActivateCon",
            name: 'SdkActivateCon',
            component: resolve => require(['@/view/SdkActivateCon.vue'], resolve),
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
        },
         {
            path: "/test",
            name: 'test',
            component: resolve => require(['@/view/test.vue'], resolve)
        },{
            path: "/LoadErr",
            name: 'LoadErr',
            component: resolve => require(['@/view/LoadErr.vue'], resolve)
        },{
            path: "/TimeOut",
            name: 'TimeOut',
            component: resolve => require(['@/view/TimeOut.vue'], resolve)
        },{
            path: "/Success",
            name: 'Success',
            component: resolve => require(['@/view/Success.vue'], resolve)
        }

    ]
})


