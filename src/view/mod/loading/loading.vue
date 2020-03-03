<template>
    <div id="textmodel">
        <div class="loading" v-show="$store.state.isLoading">
            <div class="mask"></div>
            <div class="loadcont">
                <van-loading type="spinner" color="#fff" size="30px"/>
                <span>{{$store.state.loadText}}</span>
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

        }
    },
    components:{},
    props:{

    },
    created(){
        // console.log("创建后")
    },
    mounted(){
        // console.log("loading图",this.$store.state.isLoading)
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
    methods:{}
    
}
</script>
<style scoped>
    #textmodel{

    }
    .mask{
        position: fixed;top: 0;bottom: 0;right: 0;left: 0;
        margin: auto;
        z-index: 99;
    }
    .loadcont{
        width: .8rem;height: .8rem;position: fixed;background: #000;border-radius: .1rem;;
        top: 0;bottom: 0;right: 0;left: 0;margin: auto;z-index: 100;
        display: flex;flex-direction: column;align-items: center;justify-content: space-between;
        padding:.17rem 0 .06rem 0;box-sizing: border-box;
    }
    .loadcont span{
        font-size: .14rem;text-align: center;color: #ededed;line-height: .2rem;transform:scale(.8)
    }

</style>


