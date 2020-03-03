<template>
    <div id="textmodel">
        <!-- 
            注意：
                1.调用接口方法封装在src/utils/http.js中。
                    调用方法:
                    this.$http("路径url","接口代码 例：P5OISC100",{"参数名":"参数值"},是否需要loading图(Boolean),是否需要跳转到错误页面或超时页面(Boolean)).then(res=>{
                        console.log("数据请求成功",res)
                    }).catch(err=>{
                        console.log("数据请求失败",err)
                    })

                2.初始化函数执行在 walleMain.vue中 获取到的初始化数据保存在状态管理中 变量名initData
                    第三方流水 rqs_Jrnl_No
                

         -->
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
        console.log("创建后")
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
    methods:{}
    
}
</script>
<style scoped>
    

</style>


