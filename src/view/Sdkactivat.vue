<template>
    <div id="textmodel">
       
    </div>
</template>
<script>

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


