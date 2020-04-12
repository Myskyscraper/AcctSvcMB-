<template>
    <div id="timeout">
     
        <div class="title">
             <i @click="closeBtn">X</i>
        </div>
        <div class="errimg">
            <img src="../assets/images/successico.png" alt="" />
        </div>

        <div v-if="!$store.state.activateFlag">
            <div class="distext">
                 尊敬的用户，您已激活成功
            </div>
            <p class="distwarning">您的卡号已成功激活，未开启代扣功能</p>
        </div>

        <div  v-if="$store.state.activateFlag">
             <div class="distext">
                尊敬的用户，您已激活成功
             </div>
            <p class="distwarning">您的卡号已成功激活，并已签约代扣功能</p>
        </div>
        
    </div>
</template>
<script>
// import CityModel from "./CityModel";
export default {
    name:"",
    data(){
        return {
                
        }
    },
    components:{},
    props:[],
    created(){
        // console.log("创建后")
    },
    mounted(){
        // console.log("模板编译组件挂载后")
    },
    watch:{},
    beforeUpdate(){
        // console.log("组件更新前")
    },
    updated(){
        // console.log("组件更新后")
    },
    beforeDestory(){
        // console.log("组件销毁前") 
    },
    destoryed(){
        // console.log("组件销毁后")
    },
    methods:{
        closeBtn(){
             window.WebViewJavascriptBridge.callHandler('invoke', {"action":"closeWebView"}, function(responseData) {

		        }
	        );
        }
    }
    
}
</script>
<style scoped>
  .title{
      color: #1F2533;
        font-size: .14rem;
        line-height: .44rem;
        height: .44rem;
        border: 1px solid #ebedf0;
  }
   .title i{
        float: left;padding: 0 .15rem;
    }
  .title span{
      font-size: .15rem;line-height: .44rem;margin-right: .1rem; color: #1F2533;float: right;
  }
  .errimg{
      height: .7rem;position: relative;
  }
  .errimg img{
      width: 1.3rem;height: 1.3rem;position: absolute;
      top: .2rem;right: 0;left: 0;margin: auto;
  }
  .distext{
     font-size: .18rem;text-align: center;color: #666;
     margin:90px 0 30px;
  }
  .distwarning{
       font-size: .12rem;text-align: center;color: #666;
       margin-top: 0px;
  }
</style>


