<template>
  <div>
    <van-nav-bar title="激活银行卡" left-arrow @click-left="back" />
    <van-cell-group>
      <!-- <van-field v-model="bankCardNo" label="银行卡" placeholder="请输入银行卡号" type="tel" /> -->

      <div class="bank-wrap-box" style="padding-left:30px;">
         <van-cell-group>
            <van-field v-model="custName" placeholder="姓名" label="姓名"   />
         </van-cell-group>
      </div>
        
       <div class="bank-wrap-box" style="padding-left:30px;">
         <van-cell-group>
            <van-field v-model="custName" placeholder="" label="满帮龙卡"   />
         </van-cell-group>
      </div>

      <p class="warning">
          温馨提示
      </p>

      <ul class="wrning-txt">
          <li>
              1：预激活完成后，向该账户转账不限制，付款功能仅支持在货车帮及云满app平台发生的相关业务；
          </li>
          <li>
              2：我行讲邮寄银行卡，请注意查收。请收到银行卡后携带身份证、银行卡到就近建设银行网点激活即可享受卡片优惠。
          </li>
          <li>
              3：本卡不收取卡片年费、账户管理费，跨行ATM取款费、跨行转账费。
          </li>
          <li>
              4：按照人民银行相关要求，该银行卡签收后半年未至网点激活，账户“只收不付”，为了不影响您的使用，请收到卡片后尽快激活。
          </li>
          <li>
              5:按照人民银行相关要求，个人I类账户数量受限，如开立账户为二类账户后向非绑定账户转账，存取现金，消费缴费累计限金额合计一万元。
          </li>
      </ul>

       <p class="warning strong">
          可办理以下业务
      </p>

       <div style="height:5px;"></div>

      <div class="inp-content">
              <div class="checkbox-wrap">

                <div class="spc contrc_wrap">


                    <span class="colorBlue contrc-left" >签约ETC费自动扣款服务</span>


                    <van-checkbox v-model="longChecked" ></van-checkbox> 


                    <span class="contrc-right">
                        《满帮ETC服务代扣协议》
                    </span>

                    
                </div>


               <div class="spc contrc_wrap">


                    <span class="colorBlue contrc-left" >签约贷款自动还款服务</span>


                    <van-checkbox v-model="longChecked" ></van-checkbox> 


                    <span class="contrc-right">
                      《满帮贷款代扣协议》
                    </span>

                    
                </div>


    
                  <van-cell-group>
                     <van-field v-model="custTel" placeholder="联系电话" label="联系电话"   />
                  </van-cell-group>

                   <van-cell-group>
                     <van-field v-model="custTel" placeholder="验证码" label="获取验证码"   />
                  </van-cell-group>     
               
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
      :disabled="checkCanClick"
      @click="nextStep"
    >确认提交</van-button>
  </div>
</template>


<script>
import { Dialog ,Toast} from 'vant'
export default {
  data() {
    return {
      canFlag: true,
      bank_account:"",
      display_bank_account:"",
      longChecked:true,
      verCodeText:"获取验证码",
      custTel:'',
      custName:''
    };
  },
  created() {
      this.initData();
  },
  computed: {
    checkCanClick: function() {
      if (this.bank_account.length > 16 && this.bank_account.length < 24) {
        return (this.canFlag = false);
      } else {
        return (this.canFlag = true);
      }
    },
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    initData() {
     
    },
    handleBankCardInput(e) {
      this.bank_account = e.target.value;
      this.display_bank_account = this.bank_account.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    },
    nextStep() {
     
    }
  }
};
</script>

<style scoped>
  .bank-wrap-box{
    height: 44px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
  }
   .bank-wrap-box span{
     width: 120px;
     padding-left:20px; 
   }
    .bank-wrap-box input{
      flex: 1;
    }

    .warning{
        font-size: 12px;
        padding-left: 20px;
        line-height: 30px;
        color: black;
    }
    .strong{
        color: black;
    }

    .wrning-txt{
        color: #666;
        padding:0 30px;
        font-size: 12px;
        line-height: 20px;
        margin-bottom: 10px;
    }

    .inp-content{
        font-size: 14px;
        padding: 0 30px;
    }

    .spc{
        height: 30px;
    }

    .van-cell{
        padding: 10px 0;
    }

    .contrc_wrap{
      display: flex;
    }

    .contrc_wrap span{
      line-height: 30px;
    }
   
   .contrc-left{
     width: 166px;
   }

   
</style>