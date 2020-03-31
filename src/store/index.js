import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex )

const store = new Vuex.Store({
    state: {
        isLoading: false,//loading图状态
        loadText:"",//封装的loading图展示的文字
        initData:"",//获取的初始化数据
        rqs_Jrnl_No:"",//生成的第三方流水
    },
    mutations: {
        showLoading(state,isLoad) {
            state.isLoading = isLoad
        },
        loadTextChange(state,text){
            state.loadText = text
        },
        initDataSave(state,init){
            state.initData = init
        },
        rqs_Jrnl_No_Change(state,val){
            state.rqs_Jrnl_No=val
        }
    },
    actions: {}
  
})


export default store
