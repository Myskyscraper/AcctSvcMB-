<template>
  <div>
    <van-nav-bar title="升降级卡片" left-arrow @click-left="back" />
    <van-cell-group>
      <!-- <van-field v-model="bankCardNo" label="银行卡" placeholder="请输入银行卡号" type="tel" /> -->

      <div class="bank-wrap-box" style="padding-left:30px;">
        <van-cell-group>
          <van-field v-model="custName" placeholder="姓名" label="姓名" />
        </van-cell-group>
      </div>

      <p class="warning">您名下的I类账户有</p>
      <div class="warning-list">
        <span>银行卡</span>
        <span>卡片类型</span>
        <span>降级</span>
      </div>

      <ul class="list-content">
        <li v-for="(item) in bankCardInfo" :key="item.id" @click="choseBankCard(item)">
          <span>{{item.id}}</span>
          <span>{{item.name|filterType}}</span>
          <span>
            <input type="checkbox" />
          </span>
        </li>

      </ul>

      <div class="warning-list">
        <span>活期存折</span>
      </div>

      <ul class="list-content">
        <li>
          <span>1.5xxxxxxxxxxxxxxxxx</span>
          <span>I类户</span>
          <span>
            <input type="checkbox" />
          </span>
        </li>
      </ul>

      <p class="warning">温馨提示</p>

      <ul class="wrning-txt">
        <li>1：若账户降级为二类账户，二类账户非绑定卡账户转账，存取现金，消费缴费日累计金额合计一万元，年累计限额合计20万元。</li>
        <li>2：若有一类账户已绑定二类账户相互转账功能，请先解除绑定关系后再进行账户降级操作。</li>
        <li>3：若您名下持有并超过5张卡二类账户时，将无法进行账户降级操作。</li>
      </ul>

      <div style="height:5px;"></div>

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
      custName: "",
      custBankId: "", 
      smsMes: "",
      timeNum: 60,
      disabled: true, //控制提交按钮能否点击 false为可以点击 true为禁止状态
      bankCardInfo: [
        { id: 1, name: "zs1" },
        { id: 2, name: "zs2" },
        { id: 3, name: "zs3" },
        { id: 4, name: "zs4" },
        { id: 5, name: "zs5" },
        { id: 6, name: "zs6" }
      ],
      typeOneAccoInfo:[

      ],
       typeTwoAccoInfo:[

      ],
      typeThreeAccoInfo:[

      ]
    };
  },
  created() {
    //this.initData();
  },
  computed: {
    verCodeText: function() {
      return this.timeNum > 59
        ? "重新发送"
        : "(" + this.timeNum + ")s后重新发送";
    }
  },
  filters:{
      filterType(value){
          if(value=="0"){
            return "存折";
          }else{
            return "银行卡";
          }
      }
  },
  mounted() {

  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    initDataGetApp(){
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
                    //_this.initData(responseData);
                });
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
        "TrdPt_Sign_Agrm_ID": "", //第三方签约编号
        "TXN_ITT_CHNL_CGY_CODE": "30310139",
        "intf_ECD": "01"
      };
      this.$http("URL", "P5OIS6Y05", params, true, false)
        .then(res => {
          console.log("查询银行卡信息", res);
          let Enqr_Rslt = res.Data.Enqr_Rslt//返回查询结果
          if(Enqr_Rslt =="0"){
              Toast('无此客户');
              return;
          }else if(Enqr_Rslt =="1"){
               Toast('尊敬的客户，您没有该类账户');
               return;
          }else{
               _this.bankCardInfo = res.Data.ACCOUNT_GROUP;
               let accountInfo = res.Data.ACCOUNT_GROUP;
               accountInfo.forEach((item,index)=>{
                 if(item.PD_Sign_Ind=="A"){
                    _this.typeOneAccoInfo.push(item);
                 }
               })

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
          "DbCrd_CardNo": initData,
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
      } else{
          let params = {
            "DbCrd_CardNo": bank_account,
            "Setl_Acc_CLCd":"B",
            "SMS_Vld_CD":_this.smsMes,
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

.warning-list span:nth-child(1) {
  text-align: left;
  width: 40%;
}

.warning-list span:nth-child(2) {
  width: 30%;
}

.warning-list span:nth-child(3) {
  width: 30%;
}

.list-content {
}

.list-content li {
  color: rgb(9, 182, 242);
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
  width: 40%;
}

.list-content li span:nth-child(2) {
  width: 30%;
}

.list-content li span:nth-child(3) {
  width: 30%;
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
</style>