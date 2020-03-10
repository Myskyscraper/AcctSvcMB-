<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- shouye -->
   <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <loading></loading>
  </div>
</template>

<script>
// import loading from './view/mod/loading'
export default {
  name: 'App',
  data(){
    return {
    }
  },
  components:{
    
  },
}
</script>

<style>
#app {
  background: #fff;
}

</style>
