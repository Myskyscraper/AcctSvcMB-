<template>
  <div>
    <van-nav-bar title="激活银行卡" left-arrow @click-left="back" />


    <van-cell-group>
      <div class="bank-wrap-box" style="padding-left:30px;">
        <van-cell-group>
          <van-field v-model="custName" placeholder="姓名" label="姓名" />
        </van-cell-group>
      </div>

      <div class="bank-wrap-box" style="padding-left:30px;">
        <van-cell-group>
          <van-field v-model="custBankId" placeholder label="满帮龙卡" />
        </van-cell-group>
      </div>


       <!-- 协议内容和勾选 -->
      <p class="warning">温馨提示</p>

      <ul class="wrning-txt">
        <li>1.预激活完成后，向该账户存款转账不限制，付款功能仅支持在货车帮及运满满APP平台发生相关业务；</li>
        <li>2.我行将邮寄银行卡，请注意查收。请收到银行卡后携带身份证、银行卡到就近建设银行网点激活即可享受卡片优惠。</li>
        <p class="contr_tap" @click="showMoreRuler()">点击展示</p>
       <div v-show="rulerFlag">
        <li>3：本卡不收取卡片年费、账户管理费，跨行ATM取款费、跨行转账费。</li>
        <li>4：按照人民银行相关要求，该银行卡签收后半年未至网点激活，账户“只收不付”，为了不影响您的使用，请收到卡片后尽快激活。</li>
        <li>5:按照人民银行相关要求，个人I类账户数量受限，如开立账户为二类账户后向非绑定账户转账，存取现金，消费缴费累计限金额合计一万元。</li>
       </div>
      </ul>

      <p class="warning strong">可办理以下业务</p>

      <div style="height:5px;"></div>

      <div class="inp-content">
        <div class="checkbox-wrap">
          <div class="spc contrc_wrap">
            <span class="colorBlue contrc-left">签约ETC费自动扣款服务</span>

            <van-checkbox v-model="longChecked"></van-checkbox>

            <span class="contrc-right">《满帮ETC服务代扣协议》</span>
          </div>

          <div class="spc contrc_wrap">
            <span class="colorBlue contrc-left">签约贷款自动还款服务</span>

            <van-checkbox v-model="longChecked"></van-checkbox>

            <span class="contrc-right">《满帮贷款代扣协议》</span>
          </div>
        </div>
      </div>

      <!-- 手机和短信 -->
      <div class="inp-content">
        <div class="checkbox-wrap">
          <van-cell-group>
            <van-field v-model="custTel" placeholder="联系电话" label="联系电话" />
          </van-cell-group>

          <van-row>
            <van-col span="12">
              <van-field v-model="smsMes" />
            </van-col>
            <van-col span="8">
              <van-button type="primary" size="small" @click="verificationRun">{{verCodeText}}</van-button>
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
      color="#09b6f2"
      type="number"
      class="bottomButton"
      :hairline="true"
      @click="subBtn"
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
      display_bank_account: "",
      longChecked: true,
      custTel: "",
      custName: "",
      custBankId: "",
      smsMes: "",
      timeNum: 60,
      disabled: true,//控制提交按钮能否点击 false为可以点击 true为禁止状态
      rulerFlag:false
    };
  },
  created() {
    this.initData();
  },
  computed: {
    verCodeText: function() {
      return this.timeNum > 59
        ? "重新发送"
        : "(" + this.timeNum + ")s后重新发送";
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    showMoreRuler(){
      this.rulerFlag = !this.rulerFlag;
    },
    initData() {},
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
          DbCrd_CardNo: initData,
          MblPh_No: _this.custTel,
          Vld_Cd_Us_Ind: "1", //验证码使用标志
          Tpl_Nm: "manbangActAct", //模板
          TXN_ITT_CHNL_CGY_CODE: "30310139" //
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
    subBtn() {
      var _this = this;
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
          DbCrd_CardNo: initData,//借记卡卡号
          CrdHldr_Crdt_TpCd: "1010",//持卡人证件类型代码
          CrdHldr_Crdt_No: "",//持卡人证件号码
          CrdHldr_Nm: "", //持卡人证件姓名
          GtCrd_TpCd: "08",//领卡类型代码
          SMS_Vld_CD: "",//短信验证码
          MblPh_No: _this.custTel//手机号
        };
        this.$http("URL", "P5OIS6Y27", params, true, false)
          .then(res => {
            console.log("短信获取成功", res);
          })
          .catch(err => {
            console.log("短信获取失败", err);
            Toast(err.Head.SYS_RESP_DESC);
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
  font-size: 12px;
  padding-left: 20px;
  line-height: 30px;
  color: black;
}
.strong {
  color: black;
}

.wrning-txt {
  color: #666;
  padding: 0 30px;
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 10px;
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
  line-height: 30px;
}

.contrc-left {
  width: 166px;
}

.contr_tap{
  text-align: center;
  color: red;
  font-size: 16px;
}
</style>