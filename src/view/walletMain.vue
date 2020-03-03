<template>
    <div id="textmodel">
        <div class="long-member"></div>
    </div>
</template>
<script>
// import CityModel from "./CityModel";
export default {
    name:"walletAccount",
    data(){
        return {
            
        }
    },
    components:{
        
    },
    props:[],
    created(){
        // console.log("创建后")
        setTimeout(() => {
            console.log("开始执行初始化函数")
            this.initData()
        }, 300);
    },
    mounted(){
        // alert("进入第一个页面222")
        // setTimeout(() => {
            // this.$openLoading()
        //     setTimeout(() => {
        //         this.$router.push("/walletMain")
        //     }, 2000);
        // }, 300);
    },
    watch:{},
    beforeUpdate(){
        // console.log("组件更新前")
    },
    updated(){
        // console.log("组件更新后")
    },
    beforeDestory(){
        // console.log("组件销毁前") 
    },
    destoryed(){
        // console.log("组件销毁后")
    },
    methods:{
        initData() {
            var _this=this
            this.$ccbskObj.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('invoke', {
                    "action" : "userData"
                }, function(responseData) {
                    console.log("responseData",responseData)
                    _this.$store.commit('initDataSave',responseData )
                    if(_this.$ccbskObj.isnull(responseData.Rqs_Jrnl_No)){
                        _this.$store.commit('rqs_Jrnl_No_Change',_this.$ccbskObj.generateRqsJrnlNo() )
                    }else{
                        _this.$store.commit('rqs_Jrnl_No_Change',responseData.Rqs_Jrnl_No )

                    };
                    //_this.h5View(responseData);
                    _this.toFaceRecog(responseData);
                });
            });
        },
        h5View(respData){
            let params={
                "Prtn_Chnl_ID" : respData.Prtn_Chnl_ID,
                "Prtn_Mbsh_ID" : respData.Prtn_Mbsh_ID ,
                "TXN_ITT_CHNL_CGY_CODE" : "10520131",//respFromApp.TXN_ITT_CHNL_CGY_CODE
                "Digt_Acc_Ar_ID" : respData.Digt_Acc_Ar_ID,    //
                "CcyCd" : "156",    //  币种代码
                "CshEx_Cd" : "1",   //钞汇代码
                "Enqr_Ind":"1"   //查询标志
            }
            this.$http("/LifeSvc/DigtAccWlt/DAWDigtAccInfEnqr","P5OISC100",params,true,true)
            .then(res=>{
                console.log("数据请求成功",res)
                this.$store.commit('DataC100_Change',res)//c100请求到的数据存入状态管理
                if  (res.DbCrd_CardNo != null && res.Prvt_DepAR_StCd != "00917") {
                    console.log("")
                } else {
                    if (res.Data.Wthr_Exst_Ind=="0") {
                        console.log("零钱账户 未开户")
                        this.$store.commit("openAnAccount_Change",false)
                        this.getAddress()
                        
                    }
                    if(res.Data.Wthr_Exst_Ind=="1"){
                        console.log("零钱账户 已开户")
                        this.$store.commit("openAnAccount_Change",true)
                        this.$router.push({
                            path:"/walletMenu",
                        })
                    }
                }

            }).catch(err=>{
                console.log("数据请求失败",err)
            })

        },
       toFaceRecog(){
            this.$router.push({
                    path:"/faceRecog"
            })
       }
    }
    
}
</script>
<style scoped>
    .long-member{
        background: url('./../assets/images/long-member/banner.jpg') no-repeat;
        position: absolute;top: 0;bottom: 0;right: 0;left: 0;
        margin: auto;background-size: 100% 100%;
    }
    
</style>


