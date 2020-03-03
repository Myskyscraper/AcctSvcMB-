<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- shouye -->
    <router-view/>
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
