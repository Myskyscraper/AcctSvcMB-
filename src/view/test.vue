<template>
  <div id="textmodel">
    测试的东西
    <input type="text" v-model="custTel" />
    <button @click="test()">这是个按钮1</button>
    <button @click="test1()">这是个按钮2</button>

    <div @click="quese1(5)">测试先后的顺序</div>
"/LifeSvc/DigtAccWlt/DAWDigtAccSMSVldCDSnd"
    "/AcctMgt/AcctSvcMB/OurBKSMSSend" //短信查询
    "/AcctMgt/AcctSvcMB/ASMIACCSPreActvt" //激活
    "/AcctMgt/AcctSvcMB/ASMIACCSSubstColctnArInq"//查询合约信息
    <div @click="alert()">测试弹出提示的框的</div>

    <div @click="gotoError">跳到错误页面的内容</div>
  </div>
</template>
<script>
// import CityModel from "./CityModel";
let xxxx = 0;
import { Dialog, Toast } from "vant";
export default {
  name: "",
  data() {
    return {
      custTel: "123"
    };
  },
  components: {},
  props: [],
  created() {
    console.log("创建后");
    this.initData();
  },
  mounted() {
    console.log("模板编译组件挂载后");
  },
  watch: {},
  beforeUpdate() {
    console.log("组件更新前");
  },
  updated() {
    console.log("组件更新后");
  },
  beforeDestory() {
    console.log("组件销毁前");
  },
  destoryed() {
    console.log("组件销毁后");
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    initData() {
      this.custTel = "456";
      xxxx = 1;
      console.log(xxxx);
    },
    test() {
      xxxx = 6 + xxxx;
      console.log(xxxx);
    },
    test1() {
      console.log(xxxx);
    },
    quese1(value) {
      return new Promise(function(resolve, rejected) {
        if (value > 0) {
          resolve(value);
        } else {
          rejected(value);
        }
      });
    },
    quese2() {
      console.log("yyyyy");
    },
    alert() {
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
    },
    gotoError() {
      this.$store.commit("activateFlagChange",true)
      this.$router.push({
        path: "/LoadErr",
        query: {
          rspCdDsc: "XTLP5UNKWN04",
          rqs_Jrnl_No: " 12222222222222222222222222222",
          rspInf: " 处理信息不合适"
        }
      });
    },
    test(){
      if (!_this.signChecked == true) {
        Toast("协议选项为空,请勾选协议");
        return;
      } 
    }
  }
};
</script>
<style scoped>
#textmodel {
  font-size: 18px;
  padding: 0 10px;
}
</style>


