<template>
  <div id="face_recog">
    
    <van-button
      size="normal"
      plain
      round
      margin="10px"
      color="#09b6f2"
      type="number"
      class="bottomButton"
      :hairline="true"
      @click="faceRecog"
    >点击进行人脸识别</van-button>

    <div id="test" @click="gotoUrl()">
      测试跳转路径
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    created(){
        // console.log("创建后")
        setTimeout(() => {
            console.log("开始执行初始化函数")
            this.initDataGetApp()
        }, 300);
    },
    methods: {
      initDataGetApp() {
      var _this = this;
      this.$ccbskObj.setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler(
          "invoke",
          {
            action: "userData"
          },
          function(responseData) {
            console.log("responseData", responseData);
            _this.$store.commit("initDataSave", responseData);
            if (_this.$ccbskObj.isnull(responseData.Rqs_Jrnl_No)) {
              _this.$store.commit(
                "rqs_Jrnl_No_Change",
                _this.$ccbskObj.generateRqsJrnlNo()
              );
            } else {
              _this.$store.commit(
                "rqs_Jrnl_No_Change",
                responseData.Rqs_Jrnl_No
              );
            }
            //_this.initData(responseData);
          }
        );
      });
    },

        
        faceRecog(){
            var _this = this;
            var url =_this.$route.query.from;
            const respFromApp = this.$store.state.initData;
            if(_this.$ccbskObj.isnull(respFromApp)){
               Toast("正在请求数据，请稍后再重试");
               return;
            }else{
              var dataToSDK={"Cst_Nm":respFromApp.CrdHldr_Nm,"Crdt_No":respFromApp.CrdHldr_Crdt_No,"phone":respFromApp.MblPh_No};
              window.WebViewJavascriptBridge.callHandler('invoke',{'action':'faceIdentify','param':dataToSDK},function(responseData){
                  if(responseData.Data.Cnp_Rslt_Ind =="SUCCESS"){
                        if(url=="accMngt"){
                          _this.$router.push({ path:'./AccMngtCon'});
                        }else{
                            _this.$router.push({ path:'./SdkactivatCon'});
                        }
                  }
              })

            }
            
        },
        gotoUrl(){
          var _this =this;
          var str = _this.$route.query.from;
          if(str=="accMngt"){
              _this.$router.push({ path:'./AccMngtCon'});
          }else{
             _this.$router.push({ path:'./SdkactivatCon'});
          }
          console.log("ok",str);
        }   
    }
};
</script>

<style scoped>
#test{
  font-size: 14px;
}

</style>