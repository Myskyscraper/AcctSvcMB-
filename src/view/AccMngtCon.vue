<template>
  <div id="sdkActive">
    <van-nav-bar title="激活银行卡" left-arrow @click-left="back" />
    <div class="head_wrap">
      <p class="title_info">{{custName}}，您将预激活满帮龙卡</p>
      <h5 class="title_cardInfo">{{custBankId|filterDisplayBankCard}}</h5>
    </div>

    <ul class="wrning_txt" @click="showMoreRuler()">
      <li>1.预激活完成后，向该账户存款转账不限制，付款功能仅支持在货车帮及运满满APP平台发生相关业务；</li>
      <li>2.我行将邮寄银行卡，请注意查收。请收到银行卡后携带身份证、银行卡到就近建设银行网点激活即可享受卡片优惠。</li>
      <div v-show="rulerFlag">
        <li>3.本卡不收取卡片年费、账户管理费，跨行ATM取款费、跨行转账费。</li>
        <li>4.按照人民银行相关要求，该银行卡签收后半年未至网点激活，账户“只收不付”，为了不影响您的使用，请收到卡片后尽快激活。</li>
      </div>
      <p class="contr_tap">{{promptInfo}}</p>
    </ul>

    <div style="height:15px;"></div>
    <p class="warning strong">您还可以办理以下自动业务</p>
    <div class="inp-content">
      <div class="checkbox-wrap">
        <div class="spc contrc_wrap">
          <van-checkbox v-model="signChecked"></van-checkbox>
          <span class="contrc-right">&nbsp;签约贷款自动代扣还款服务</span>
        </div>
      </div>
    </div>

    <div style="height:28px;"></div>
    <!-- 手机和短信 -->
    <div class="inp-content">
      <div class="checkbox-wrap">
        <van-cell-group>
          <van-field v-model="custTel" placeholder="联系电话" type="tel" />
        </van-cell-group>

        <van-row>
          <van-col span="17">
            <van-field v-model="smsMes" />
          </van-col>
          <van-col span="7" class="mesBtn">
            <van-button type="yellow" size="small" @click="verificationRun">{{verCodeText}}</van-button>
          </van-col>
        </van-row>
      </div>
    </div>

    <div class="contrc_wrap_smlall">
      <van-checkbox v-model="signChecked" style="width:25px;"></van-checkbox>
      <span style="width:10px;"></span>
      <span style="padding-right:40px;">
        &nbsp;我已阅读并同意:
        <router-link to="./contract">《中国建设银行代收业务和扣款授权协议》</router-link>
      </span>
    </div>

    <van-button
      size="normal"
      plain
      round
      margin="10px"
      color="#FFD338"
      type="number"
      class="bottomButton"
      :hairline="true"
      style="background:#FFD338;color:#333;"
      @click="subBtn()"
    >确认提交</van-button>
  </div>
</template>



<script>
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      canFlag: true,
      signChecked: true,
      custTel: "",
      custName: "",
      custBankId: "",
      smsMes: "",
      timeNum: 60,
      disabled: true, //控制提交按钮能否点击 false为可以点击 true为禁止状态
      rulerFlag: false //展示更多
    };
  },
  created() {
    this.initData();
  },
  computed: {
    verCodeText: function() {
      return this.timeNum > 59 ? "发送验证码" : "(" + this.timeNum + ")s";
    },
    promptInfo() {
      return this.rulerFlag == false ? "点击展开" : "点击关闭";
    }
  },
  filters: {
    filterDisplayBankCard(value) {
      //格式化银行卡号
      if (value == undefined) {
        console.log("11111");
        return value;
      } else {
        return (value = value
          .replace(/\s/g, "")
          .replace(/(\d{4})(?=\d)/g, "$1 "));
      }
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    showMoreRuler() {
      this.rulerFlag = !this.rulerFlag;
    },
    initData() {
      //初始化赋值
      const respFromApp = this.$store.state.initData;
      this.custName = respFromApp.CrdHldr_Nm;
      this.custBankId = respFromApp.DbCrd_CardNo;
      this.custTel = respFromApp.mblphNo;
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
          "DbCrd_CardNo": initData.DbCrd_CardNo,
          "MblPh_No": _this.custTel,
          "Vld_CD_Us_Ind": "1", //验证码使用标志
          "Tpl_Nm": "manbangActDmt", //模板
          "TXN_ITT_CHNL_CGY_CODE": "30310139", //
          "TXN_INSID":"520423600"
        };
        console.log("短信请求信息",params)
        _this.$http(
          "/AcctMgt/AcctSvcMB/OurBKSMSSend",
          "P5OIS6Y27",
          params,
          true,
          false
        )
          .then(res => {
            console.log("短信获取成功", res);
            Toast("短信发送成功");
          })
          .catch(err => {
            console.log("短信获取失败", err);
            Toast("短信获取失败", err);
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
  
    withHoldSign() {
      // 代扣协议
      var _this = this;
      const respFromApp = this.$store.state.initData;
      const trckEndToETCphrtxtVal = this.$store.state.trckEndToETCphrtxtVal;
      let params = {
        "ORG_TX_ID": "P5C01Q700",
        "Entrst_Prj_ID": "520830254", //项目编号
        "TrdPCt_ID_Fst_ID":respFromApp.DbCrd_CardNo, //客户唯一编号
        "TrdPCt_AccNo": respFromApp.DbCrd_CardNo, //银行卡号
        "TrdPCt_Crdt_No": respFromApp.CrdHldr_Crdt_No, //身份证号码
        "Mdf_Msg_Tp":"0",
        "PKey_CntDsc":trckEndToETCphrtxtVal//验活密串
      };
      _this.$http("/AcctMgt/AcctSvcMB/ASMIACCSSubstColctnSign", "P5C01Q700", params, true, true)
        .then(res => {
          console.log("代扣成功", res);
          _this.$router.push({ path: "./Success"});
        })
        .catch(err => {
          console.log("代扣失败", err);
          Toast("代扣失败", err);
        });
    },
    subBtn() {
      var _this = this;
      const respFromApp = this.$store.state.initData;
      const trckEndToETCphrtxtVal = this.$store.state.trckEndToETCphrtxtVal;
      if (_this.$ccbskObj.isnull(_this.custName)) {
        Toast("姓名不能为空，请重新输入");
        return;
      } else if (_this.custBankId.length < 17 || _this.custBankId.length > 22) {
        Toast("银行卡格式不正确，请重新输入");
        return;
      } else if (!_this.custTel.length == 11) {
        Toast("手机格式不正确，请重新输入");
        return;
      } else if (_this.$ccbskObj.isnull(_this.smsMes)) {
        Toast("验证码输入为空，请重新输入");
        return;
      } else if (_this.smsMes.length < 4 || _this.smsMes.length >7){
        Toast("验证码格式不对，请重新输入");
        return;
      } else if (!_this.signChecked == true) {
        Toast("协议选项为空,请勾选协议");
        return;
      } else {
        let params = {
          "TXN_ITT_CHNL_CGY_CODE":"30310139",
          "DbCrd_CardNo": respFromApp.DbCrd_CardNo, //借记卡卡号
          "CrdHldr_Crdt_TpCd": "1010", //持卡人证件类型代码
          "CrdHldr_Crdt_No": respFromApp.CrdHldr_Crdt_No, //持卡人证件号码
          "CrdHldr_Nm": respFromApp.CrdHldr_Nm, //持卡人证件姓名
          "GtCrd_TpCd": "14", //新卡激活
          "SMS_Vld_CD": _this.smsMes, //短信验证码
          "MblPh_No": _this.custTel, //手机号
          "TrckEndToETCphrtxtVal":"BeeFR2RPiYDLsc4UvVs2+sEjl7y0/a/t75q7OFsg9v9hPNDJCgWr03Jd0aWv+Bkz5VB1b86UBz0Ey5dZb4W8e9wuBRFLjKH7GzG2+0QnNSpeg5pL0gmIfCdS1X/180Du",
          "MsgRp_Bag_Nm":respFromApp.MsgRp_Bag_Nm,
          "TXN_INSID":"520423600"
        };
        console.log("激活请求信息",params)
        _this.$http(
          "/AcctMgt/AcctSvcMB/ASMIACCSPreActvt",
          "P5OIS6Y36",
          params,
          true,
          true
        ).then(res => {
            console.log("激活成功", res);
            _this.withHoldSign();
          })
          .catch(err => {
            console.log("激活失败", err);
            Toast("激活失败", err);
          });
      }
    }
  }
};
</script>

<style scoped>
#sdkActive {
  font-size: 14px;
}
.head_wrap {
  padding-top: 15px;
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #1f2533;
  text-align: center;
}
.title_info {
  margin-bottom: 5px;
}
.title_cardInfo {
  font-size: 18px;
  color: #1f2533;
  text-align: center;
}

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
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #999999;
  padding: 0 25px;
}
.strong {
  color: black;
  margin: 5px 0;
}

.wrning_txt {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #999999;
  line-height: 18px;
  padding: 10px 25px;
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

.contrc_wrap {
  display: flex;
}

.contrc_wrap span {
  font-family: PingFangSC-Regular;
  font-size: 15px;
  color: #333333;
  line-height: 30px;
}

.contrc-left {
  width: 166px;
}

.contr_tap {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #4fa0fb;
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
.mesBtn {
  margin-top: 9px;
}
</style>
