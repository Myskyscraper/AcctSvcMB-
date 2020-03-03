<template>
  <div>
    <van-nav-bar title="代扣协议" left-arrow @click-left="back" />
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


                   <div class="spc contrc_wrap">


                    <span class="colorBlue contrc-left" >签约其他业务自动扣款服务     </span>


                    <van-checkbox v-model="longChecked" ></van-checkbox> 


                    <span class="contrc-right">
                      《满帮其他业务代扣协议》
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


         <p class="warning">
          温馨提示
      </p>

      <ul class="wrning-txt">
          <li>
             请您注意，如签约账户为II类户，II类户非绑定账户转账、存取现金、消费缴费日累计限额合计1万元，年累计限额合计20万元。超过人行规定限额自动扣款业务会失败！

          </li>
         
      </ul>

      

     
      
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
      custTel:''
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