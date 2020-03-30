<template>
    <div id="timeout">
     
        <div class="title">
            <span @click="closeBtn">返回</span>
        </div>
        <div class="errimg">
            <img src="../assets/images/successico.png" alt="" />
        </div>
        <div class="distext">
          激活成功
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
        back(){

        },
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
      height: .44rem;
      border: 1px solid #ebedf0;
  }
  .title span{
      font-size: .15rem;line-height: .44rem;margin-right: .1rem; color: #1F2533;float: right;
  }
  .errimg{
      height: .7rem;position: relative;
  }
  .errimg img{
      width: 1rem;height: 1rem;position: absolute;
      top: .2rem;right: 0;left: 0;margin: auto;
  }
  .distext{
      font-size: .18rem;line-height: 1.4rem;text-align: center;color: #666;
  }
</style>


