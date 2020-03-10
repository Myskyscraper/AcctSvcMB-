<template>
  <div>
    <van-nav-bar title="账户升降级管理" left-arrow @click-left="back" />
    <van-cell-group>
      <div class="head_wrap">
        <p class="title_info">{{custName}}，您将预激活满帮龙卡</p>
      </div>

      <p class="warning">将满帮龙卡升级为Ⅰ类户</p>

      <ul class="list-content">
        <li v-for="(item) in bankCardInfo1" :key="item.id" @click="choseBankCard(item)">
          <span>{{item.id}}</span>
          <span>{{item.name|filterType}}</span>
        </li>
      </ul>

      <p class="warning">将您名下的Ⅰ类户降级为Ⅱ类户</p>

      <ul class="list-content">
        <li v-for="(item) in bankCardInfo" :key="item.id" @click="choseBankCard(item)">
          <span>{{item.id}}</span>
          <span>{{item.name|filterType}}</span>
        </li>
      </ul>

      <ul class="warning-txt">
        <li>1：若账户降级为二类账户，二类账户非绑定卡账户转账，存取现金，消费缴费日累计金额合计一万元，年累计限额合计20万元。</li>
        <li>2：若有一类账户已绑定二类账户相互转账功能，请先解除绑定关系后再进行账户降级操作。</li>
        <li>3：若您名下持有并超过5张卡二类账户时，将无法进行账户降级操作。</li>
      </ul>

      <div style="height:28px;"></div>
      <!-- 手机和短信 -->
      <div class="inp-content">
        <div class="checkbox-wrap">
          <van-cell-group>
            <van-field v-model="custTel" placeholder="联系电话" type="tel" />
          </van-cell-group>

          <van-row>
            <van-col span="18">
              <van-field v-model="smsMes" />
            </van-col>
            <van-col span="6">
              <van-button type="yellow" size="small" @click="verificationRun">{{verCodeText}}</van-button>
            </van-col>
          </van-row>
        </div>
      </div>
    </van-cell-group>

    <van-button
      size="normal"
      plain
      round
      margin="10px"
      color="#FFD338"
      type="number"
      class="bottomButton"
      style="background: rgb(255, 211, 56);
    color: rgb(255, 211, 56);
    border-color: rgb(255, 211, 56);"
      :hairline="true"
      @click="nextStep"
    >确认提交</van-button>
  </div>
</template>


<script>
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      canFlag: true,
      bank_account: "",
      custTel: "",
      custName: "张三",
      custBankId: "",
      smsMes: "",
      timeNum: 60,
      disabled: true, //控制提交按钮能否点击 false为可以点击 true为禁止状态
      bankCardInfo1: [{ id: "12345678900", name: "zs1" }],
      bankCardInfo: [
        { id: "12345678901", name: "zs1" },
        { id:"12345678902", name: "zs2" },
        { id: "12345678903", name: "zs3" },
        { id:"12345678904", name: "zs4" },
        { id: "12345678905", name: "zs5" },
        { id: "12345678906", name: "zs6" }
      ],
      typeOneAccoInfo: [],
      typeTwoAccoInfo: [],
      typeThreeAccoInfo: []
    };
  },
  created() {
    //this.initData();
  },
  computed: {
    verCodeText: function() {
      return this.timeNum > 59
        ? "重新发送"
        : "(" + this.timeNum + ")s";
    }
  },
  filters: {
    filterType(value) {
      if (value == "0") {
        return "存折";
      } else {
        return "银行卡";
      }
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
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
    initData() {
      var _this = this;
      const respFromApp = this.$store.state.initData;
      let params = {
        "Id_Crdt_Tpcd": "1010", //识别证件类型代码
        "Id_Crdt_No": respFromApp.Id_Crdt_No, //证件号码
        "Id_IdvLgl_Nm": respFromApp.Id_IdvLgl_Nm, //法定名称
        "Setl_Acc_CLCd": "A", //
        "TrdPt_Sign_Agrm_ID": respFromApp.Prtn_Chnl_ID, //第三方签约编号
        "TXN_ITT_CHNL_CGY_CODE": "30310139",
        "intf_ECD": "01"
      };
      this.$http("URL", "P5OIS6Y05", params, true, false)
        .then(res => {
          console.log("查询银行卡信息", res);
          let Enqr_Rslt = res.Data.Enqr_Rslt; //返回查询结果
          if (Enqr_Rslt == "0") {
            Toast("无此客户");
            return;
          } else if (Enqr_Rslt == "1") {
            Toast("尊敬的客户，您没有该类账户");
            return;
          } else {
            _this.bankCardInfo = res.Data.ACCOUNT_GROUP;
            let accountInfo = res.Data.ACCOUNT_GROUP;
            accountInfo.forEach((item, index) => {
              if (item.PD_Sign_Ind == "A") {
                _this.typeOneAccoInfo.push(item);
              }
            });
          }
        })
        .catch(err => {
          console.log("查询银行卡信息", err);
          Toast(err.Head.SYS_RESP_DESC);
        });
    },
    verificationRun() {
      var _this = this;
      let initData = this.$store.state.initData;
      console.log("0000", _this.custTel);
      if (_this.custTel.length == 11) {
        if (!this.disabled) {
          return;
        }
        this.verificationNum();
        let params = {
          "DbCrd_CardNo": initData,//银行卡卡号
          "MblPh_No": _this.custTel,
          "Vld_Cd_Us_Ind": "1", //验证码使用标志
          "Tpl_Nm": "manbangActDmt", //模板
          "TXN_ITT_CHNL_CGY_CODE": "30310139" //
        };
        this.$http("URL", "P5OIS6Y27", params, true, false)
          .then(res => {
            console.log("短信获取成功", res);
          })
          .catch(err => {
            console.log("短信获取失败", err);
            Toast(err.Head.SYS_RESP_DESC);
          });
      } else {
        Toast("输入的手机号格式错误");
      }
    },
    verificationNum: function() {
      if (this.timeNum > 0) {
        this.timeNum--;
        setTimeout(this.verificationNum, 1000);
        this.disabled = false; //开始计时 按钮禁止点击
      } else {
        this.disabled = true; //当timeNum为0时 恢复点击 timeNum重归30
        this.timeNum = 60;
      }
    },
    choseBankCard(val) {
      console.log(val);
      this.bank_account = val.SrcSys_AR_ID;
    },
    nextStep() {
      var _this = this;
      const respFromApp = this.$store.state.initData;
      if (_this.$ccbskObj.isnull(_this.custName)) {
        Toast("姓名不能为空，请重新输入");
        return;
      } else if (_this.custBankId.length < 17 || _this.custBankId.length > 22) {
        Toast("银行卡格式不正确，请重新输入");
        return;
      } else if (!_this.custTel.length == 11) {
        Toast("银行卡格式不正确，请重新输入");
        return;
      } else if (_this.$ccbskObj.isnull(_this.smsMes)) {
        Toast("验证码输入为空，请重新输入");
        return;
      } else {
        let params = {
          "DbCrd_CardNo": bank_account,
          "Setl_Acc_CLCd": "B",
          "SMS_Vld_CD": _this.smsMes,
          "MblPh_No": _this.custTel
        };
        this.$http("URL", "P5OIS6Y37", params, true, false)
          .then(res => {
            console.log("升降级成功", res);
          })
          .catch(err => {
            console.log("升降级失败", err);
            // Toast(err.Head.SYS_RESP_DESC);
          });
      }
    }
  }
};
</script>

<style scoped>
.bank-wrap-box {
  height: 44px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}
.bank-wrap-box span {
  width: 120px;
  padding-left: 20px;
}
.bank-wrap-box input {
  flex: 1;
}

.warning {
  margin-top: 10px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
}
.strong {
  color: black;
}

.inp-content {
  font-size: 14px;
  padding: 0 30px;
}

.spc {
  height: 30px;
}

.van-cell {
  padding: 10px 0;
}

.warning-list {
  height: 30px;
  font-size: 14px;
  padding-left: 30px;
  line-height: 30px;
}

.warning-list span {
  display: block;
  float: left;
  width: 33%;
  text-align: center;
}

.list-content {
}

.list-content li {
  color: #333;
  font-size: 12px;
  line-height: 20px;
  height: 20px;
  padding-left: 30px;
}

.list-content li span {
  display: block;
  float: left;
  width: 33%;
  text-align: center;
}

.list-content li span:nth-child(1) {
  text-align: left;
  width: 50%;
  box-sizing: border-box;
  padding-left: 0px;
}

.list-content li span:nth-child(2) {
  width: 50%;
  box-sizing: border-box;
  padding-left: 0px;
}

.van-cell {
  padding: 10px 0;
}

.contrc_wrap {
  display: flex;
}

.contrc_wrap span {
  line-height: 30px;
}

.contrc-left {
  width: 166px;
}

.contr_tap {
  text-align: center;
  color: red;
  font-size: 16px;
}

.head_wrap {
  padding-top: 15px;
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #1f2533;
  text-align: center;
}

.warning-txt {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #999999;
  line-height: 18px;
  padding: 10px 10px;
}

.van-button--yellow {
  color: #fff;
  background-color: #ffd338;
  border: 1px solid #ffd338;
  color: #333333;
}
.van-checkbox__icon .van-icon {
  border: 1px solid #333;
}

.contrc_wrap_smlall {
  margin-top: 30px;
  padding-left: 30px;
  display: flex;
  font-size: 12px;
}

.van-button--normal {
  color: #333;
}
.van-button__text {
  color: #333;
}
</style>