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
  </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        faceRecog(){
            var _this = this;
            let initData = this.$store.state.initData;
            //let objDataC101 = this.$store.state.dataC101;
            //var dataToSDK={"Cst_Nm":objDataC101.Data.CrdHldr_Nm,"Crdt_No":objDataC101.Data.CrdHldr_Crdt_No,"phone":objDataC101.Data.MblPh_No,"CstId":"","commAuthFields":""};
            var dataToSDK={"Cst_Nm":initData.CrdHldr_Nm,"Crdt_No":initData.CrdHldr_Crdt_No,"phone":initData.MblPh_No,"CstId":"","commAuthFields":""};
            window.WebViewJavascriptBridge.callHandler('invoke',{'action':'faceIdentifyWithCstId','param':dataToSDK},function(responseData){
                if(responseData.Data.Cnp_Rslt_Ind =="SUCCESS"){
                     _this.$router.push({ path:'./Sdkactivat'});
                }
            })
        }   
    }
};
</script>

<style scoped>
</style>