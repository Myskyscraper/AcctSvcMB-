<template>
    <div id="timeout">
     
        <div class="title">
            <span>返回</span>
        </div>
        <div class="errimg">
            <img src="../assets/images/failure.png" alt="" />
        </div>
        <div class="distext">
            尊敬的客户，系统超时，请稍后再试
        </div>

         <div class="errcontent">
            <p>流水号:{{$route.query.rqs_Jrnl_No}}</p>
            <p>错误描述:{{$route.query.rspInf}}</p>
            <p>错误码:{{$route.query.rspCdDsc}}</p>
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
            this.$router.go(-1); //返回上一层
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

   .errcontent{
        font-size: .14rem;
        text-align: center;
        padding: 0 .2rem;
        color: #666;line-height: .22rem;
    }
</style>


