import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex )

const store = new Vuex.Store({
    state: {
        isLoading: false,//loading图状态
        loadText:"",//封装的loading图展示的文字
        initData:"",//获取的初始化数据
        rqs_Jrnl_No:"",//生成的第三方流水
        dataC100:{},//c100接口中返回的数据
        Avl_Bal:"",//首页中的金额
        openAnAccount:false,
        modFornmData:{},
        deleteFlag:false,//删除银行卡开关，控制只有一个列能滑动
        addressesData:{},//未开户时调用地址接口返回的数据
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
        },
        DataC100_Change(state,val){
            state.dataC100=val
        },
        Avl_Bal_Change(state,val){
            state.Avl_Bal=val
        },
        openAnAccount_Change(state,val){
            state.openAnAccount=val
        },
        modFornmData_Change(state,val){
            state.modFornmData=val
        },
        deleteFlag_Change(state,val){
            state.deleteFlag=val
        },
        addressesData_Change(state,val){
            state.addressesData=val
        }
    },
    actions: {}
  
})


export default store
