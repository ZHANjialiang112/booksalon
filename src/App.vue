<template>
  <div id="app">
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--    <router-link to="/index"></router-link>-->
    <!--    <router-view></router-view>-->

    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
// import Index from './components/Index';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // Index
  }
}
</script>

<style>
body{
  background-image: url("assets/pg.jpg");
}
#app {
  width: 100%;
  height: 100%;
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
