<template>
    <div id="loadErr">
        <div class="title">
            <i @click="closeWeb">X</i>
            <span @click="back">返回</span>
        </div>
        <div class="errmain">
             
            <div class="errtitle"></div>
            <img src="../assets/images/failure.png" alt="">
            <span>加载数据失败</span>
            <div class="errcontent">
                <p>流水号:{{$route.query.rqs_Jrnl_No}}</p>
                <p>错误描述:{{$route.query.rspInf}}</p>
                <p>错误码:{{$route.query.rspCdDsc}}</p>
            </div>
        </div>
    </div>
</template>
<script>
// import CityModel from "./CityModel";
export default {
    name:"",
    data(){
        return {
            // initData:null
            
        }
    },
    components:{},
    props:[],
    created(){
        // console.log("创建后")
    },
    mounted(){
        // console.log("模板编译组件挂载后")
        // console.log("路由中的数据",this.$route.query)
        // console.log("vuex中的数据",this.$store.state.initData)
        // this.initData=JSON.parse(this.$store.state.initData)
        // this.textFn()
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
            this.$router.go(-1)
        },
        closeWeb(){
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
    .title span{
        float: right;padding: 0 .15rem;
    }
    .title i{
        float: left;padding: 0 .15rem;
    }
    .errmain{
        position: relative;
    }
    .errmain .errtitle{
        height: .9rem;
        /* background: #ffd338; */
    }
    .errmain img{
        width: 1rem;height: 1rem;position: absolute;top: .4rem;
        left: 0;right: 0;margin: auto;
    }
    .errmain span{
        color:#666;position: absolute;top: 1.5rem;
        right: 0;left: 0;margin: auto;font-size: .16rem;text-align: center;
    }
    .errcontent{
        font-size: .14rem;margin-top: 1rem;text-align: center;padding: 0 .2rem;
        color: #666;line-height: .22rem;
    }



</style>


