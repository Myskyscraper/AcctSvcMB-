<template>
  <div>
    <van-nav-bar title="升降级卡片" left-arrow @click-left="back" />
    <van-cell-group>
      <!-- <van-field v-model="bankCardNo" label="银行卡" placeholder="请输入银行卡号" type="tel" /> -->
        
      <div class="bank-wrap-box" style="padding-left:30px;">
         <van-cell-group>
            <van-field v-model="custName" placeholder="姓名" label="姓名"   />
         </van-cell-group>
      </div>



        <p class="warning">
            您名下的I类账户有
        </p>
      <div class="warning-list">
        <span>银行卡</span>
        <span> 卡片类型</span>
        <span>降级</span>
      </div>

      <ul class="list-content">
          <li>
              <span>1.5xxxxxxxxxxxxxxxxx</span>
              <span>I类户</span>
              <span>  <input type="checkbox"></span>
          </li>
          <li>
              <span>1.5xxxxxxxxxxxxxxxxx</span>
              <span>I类户</span>
              <span>  <input type="checkbox"></span>
          </li>
          <li>
              <span>1.5xxxxxxxxxxxxxxxxx</span>
              <span>I类户</span>
              <span>  <input type="checkbox"></span>
          </li>
      </ul>


      <div class="warning-list">
        <span>活期存折</span>
      
      </div>

       <ul class="list-content">
          <li>
              <span>1.5xxxxxxxxxxxxxxxxx</span>
              <span>I类户</span>
               <span>  <input type="checkbox"></span>
          </li>
      </ul>


















      <p class="warning">
          温馨提示
      </p>

      <ul class="wrning-txt">
          <li>
              1：若账户降级为二类账户，二类账户非绑定卡账户转账，存取现金，消费缴费日累计金额合计一万元，年累计限额合计20万元。
          </li>
          <li>
              2：若有一类账户已绑定二类账户相互转账功能，请先解除绑定关系后再进行账户降级操作。
          </li>
          <li>
              3：若您名下持有并超过5张卡二类账户时，将无法进行账户降级操作。
          </li>
          
      </ul>

     

       <div style="height:5px;"></div>

      <div class="inp-content">
              <div class="checkbox-wrap">

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

    .warning-list{
        height: 30px;
        font-size: 14px;
        padding-left: 30px;
        line-height: 30px;
    }

    .warning-list span{
        display: block;
        float: left;
        width: 33%;
        text-align: center;
    }

    .warning-list span:nth-child(1){
         text-align: left;
        width: 40%;
    }

     .warning-list span:nth-child(2){
        width: 30%;
    }

      .warning-list span:nth-child(3){
        width: 30%;
    }

    .list-content{
        
    }

    .list-content li{
       color: rgb(9, 182, 242);
        font-size: 12px;
        line-height: 20px;
        height: 20px;
        padding-left: 30px;
    
    }

    .list-content li span{
        display: block;
        float: left;
        width: 33%;
        text-align: center;
    }

     .list-content li span:nth-child(1){
         text-align: left;
        width: 40%;
    }

     .list-content li span:nth-child(2){
        width: 30%;
    }

      .list-content li span:nth-child(3){
        width: 30%;
    }
   

   
</style>