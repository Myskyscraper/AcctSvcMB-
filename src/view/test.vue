<template>
    <div id="textmodel">
       测试的东西
       <input type="text" v-model="custTel">
       <button @click='test()'>这是个按钮1</button>
        <button @click='test1()'>这是个按钮2</button>
        1: 短信验证的
        2：发送激活的
        3：再调查询 -再代扣的
        4:那一块是什么东西的

        <div @click="quese1()">
            测试先后的顺序
        </div>

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
    quese1(){
        console.log('ooooo');
    },
    quese2(){

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


