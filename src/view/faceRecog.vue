<template>
  <div id="face_recog">
    <van-nav-bar title="人脸校验" left-arrow @click-left="back" />
    <p class="warmint_info">拍摄您本人人脸，请确保正对手机，光线充足</p>

    <div class="user_img_head">
      <img :src="imgUrl" />
    </div>
    <van-button
      size="normal"
      plain
      round
      margin="10px"
      type="number"
      class="bottomButton"
      :hairline="true"
      @click="faceRecog()"
      style="background: rgb(255, 211, 56);
    color: #000;"
    >采集本人人脸</van-button>

  </div>
</template>

<script>
import { Dialog, Toast } from "vant";

export default {
  data() {
    return {
      imgUrl: require("../assets/images/info/faceIdent.png")
    };
  },
  created() {
    // console.log("创建后")
    setTimeout(() => {
      console.log("开始执行初始化函数");
      this.initDataGetApp();
    }, 300);
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false; // 从刷脸过去加载页面
    next();
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
            _this.directFaceRecog(responseData);
          }
        );
      });
    },

    back() {
      let dataToFront = {};
      window.WebViewJavascriptBridge.callHandler(
        "invoke",
        { action: "closeWebView", param: dataToFront },
        function(responseData) {}
      );
    },
    faceRecog() {
      var _this = this;
      var url = _this.$route.query.from;
      const respFromApp = this.$store.state.initData;
      if (_this.$ccbskObj.isnull(respFromApp)) {
        Toast("正在请求数据，请稍后再试");
        return;
      } else {
        var dataToSDK = {
          Cst_Nm: respFromApp.CrdHldr_Nm,
          Crdt_No: respFromApp.CrdHldr_Crdt_No,
          phone: respFromApp.mblphNo
        };
        console.log("dataToSDK", dataToSDK);
        window.WebViewJavascriptBridge.callHandler(
          "invoke",
          { action: "faceIdentify", param: dataToSDK },
          function(responseData) {
            console.log("刷脸返回的信息", responseData);
            let rspCdDSC = responseData.Head.Txn_Rsp_Cd_Dsc;
            let rspInf = responseData.Head.Txn_Rsp_Inf;
            if (responseData.Data.Cmp_Rslt_Ind == "SUCCESS") {
              Dialog.alert({
                title: "提示",
                message: "验证成功"
              }).then(() => {
                console.log("ok");
                _this.$store.commit(
                  "trckEndToETCphrtxtValSave",
                  responseData.Data.Enc_Rslt_Info
                ); //保存验活密串
                if (url == "accMngt") {
                  _this.$router.push({ path: "./AccMngtCon" });
                } else {
                  _this.$router.push({ path: "./SdkActivateCon" });
                }
              });
            } else {
              Toast(rspCdDSC + rspInf);
              return;
            }
          }
        );
      }
    },
    directFaceRecog(responseData) {
      var _this = this;
      var dataToSDK = {
        Cst_Nm: responseData.CrdHldr_Nm,
        Crdt_No: responseData.CrdHldr_Crdt_No,
        phone: responseData.mblphNo
      };
      console.log("dataToSDK", dataToSDK);
      window.WebViewJavascriptBridge.callHandler(
        "invoke",
        { action: "faceIdentify", param: dataToSDK },
        function(responseData) {
          console.log("刷脸返回的信息", responseData);
          let rspCdDSC = responseData.Head.Txn_Rsp_Cd_Dsc;
          let rspInf = responseData.Head.Txn_Rsp_Inf;
          if (responseData.Data.Cmp_Rslt_Ind == "SUCCESS") {
            _this.$store.commit(
              "trckEndToETCphrtxtValSave",
              responseData.Data.Enc_Rslt_Info
            ); //保存验活密串
            if (url == "accMngt") {
              _this.$router.push({ path: "./AccMngtCon" });
            } else {
              _this.$router.push({ path: "./SdkActivateCon" });
            }
          } else {
            Toast(rspCdDSC + rspInf);
            return;
          }
        }
      );
    },
    gotoUrl() {
      var _this = this;
      var str = _this.$route.query.from;
      if (str == "accMngt") {
        _this.$router.push({ path: "./AccMngtCon" });
      } else {
        _this.$router.push({ path: "./SdkactivateCon" });
      }
      console.log("ok", str);
    }
  }
};
</script>

<style scoped>
.warmint_info {
  font-size: 12px;
  line-height: 60px;
  text-align: center;
}
.user_img_head img {
  display: block;
  width: 240px;
  height: 240px;
  margin: 70px auto 110px;
}
#test {
  font-size: 14px;
}
</style>