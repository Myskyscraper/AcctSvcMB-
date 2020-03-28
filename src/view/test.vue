<template>
    <div id="textmodel">
       测试的东西
       <input type="text" v-model="custTel">
       <button @click='test()'>这是个按钮1</button>
        <button @click='test1()'>这是个按钮2</button>
    
        <div @click="quese1(5)">
            测试先后的顺序
        </div>

        "/LifeSvc/DigtAccWlt/DAWDigtAccSMSVldCDSnd"
        "/AcctMgt/AcctSvcMB/OurBKSMSSend"  //短信查询
        "/AcctMgt/AcctSvcMB/ASMIACCSPreActvt" //激活
        "/AcctMgt/AcctSvcMB/ASMIACCSSubstColctnArInq"//查询合约信息

    </div>
</template>
<script>
// import CityModel from "./CityModel";
let xxxx=0;
export default {
    name:"",
    data(){
        return {
            custTel:'123'
        }
    },
    components:{},
    props:[],
    created(){
        console.log("创建后");
        this.initData();
    },
    mounted(){
        console.log("模板编译组件挂载后")
    },
    watch:{},
    beforeUpdate(){
        console.log("组件更新前")
    },
    updated(){
        console.log("组件更新后")
    },
    beforeDestory(){
        console.log("组件销毁前") 
    },
    destoryed(){
        console.log("组件销毁后")
    },
    methods:{
        back() {
        this.$router.go(-1); //返回上一层
    },
    initData(){
        this.custTel ="456";
        xxxx=1;
        console.log(xxxx);

    },
    test(){
        xxxx=6+xxxx;
        console.log(xxxx);
    },
    test1(){
        console.log(xxxx);
    },
    quese1(value){
        return new Promise(function(resolve,rejected){
            if(value>0){
                resolve(value);
            }else{
                rejected(value);
            }
        })
    },
    quese2(){
        console.log('yyyyy');
    }
    }
    
}
</script>
<style scoped>
    #textmodel{
        font-size: 18px;
        padding: 0 10px;
    }

</style>


