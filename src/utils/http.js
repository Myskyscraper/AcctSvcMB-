import Vue from 'vue'
import router from '../router'
import store from '../store'
// import {ccbskObj} from './ccbsk'

//掉用接口方法
const http = function (url,SYS_TX_CODE,params,loading,goToUrl) {
    // console.log(store.state.isLoading)
    if (loading) {
        store.commit('loadTextChange',"正在加载")//loading显示的文字
        store.commit('showLoading', true)//打开loading图
    }
    // Vue.prototype.$openLoading()
    return new Promise(function(resolve,reject) {
        var jsonData = {//入参
            //请求路径
            "Url": url,  //DAWBndgAccRelEnqr
            "Head": {
                "SYS_TX_CODE": SYS_TX_CODE,
                "Rqs_Jrnl_No": store.state.Rqs_Jrnl_No
            },
            "Data": params
        };
        try {
            window.WebViewJavascriptBridge.callHandler('send', jsonData, function (responseData) {
                if (loading) {
                    store.commit('showLoading', false)//请求成功关闭loading图
                }
                var rspCdDsc = responseData.Head.Txn_Rsp_Cd_Dsc;
                var rspInf = responseData.Head.Txn_Rsp_Inf;
                if (rspInf == 'success') {
                    resolve(responseData)
                }else if (rspCdDsc == 'XTLP5UNKWN02' || rspCdDsc == 'XTLP5UNKWN04') {
                    //转到超时页面
                    if (goToUrl) {
                        router.push("/timeOut")
                    }
                    reject(responseData)
                } else if(rspCdDsc=="YDCTS1001008"||rspCdDsc=="YDCTS1001009"){
                    reject(responseData)
                }else{
                    reject(responseData)
                    //转到错误页面
                    if (goToUrl) {
                        router.push({
                            path:"/loadErr",
                            query:{
                                rspCdDsc:rspCdDsc,
                                rqs_Jrnl_No:store.state.Rqs_Jrnl_No,
                                rspInf:rspInf
                            }
                        })
                    }
                }
            });
        } catch (e) {
            if (loading) {
                store.commit('showLoading', false)//请求错误关闭loading图
            }
            reject(responseData)
        }
    })
}

export default http;