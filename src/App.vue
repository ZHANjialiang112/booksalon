<template>
  <div id="app" class="hidden hidden01">
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--    <router-link to="/index"></router-link>-->
    <!--    <router-view></router-view>-->

    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/Login.vue';
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
body {
  width: 100%;
  height: 100%;
  background-image: url("assets/pg.jpg");
}

#app {
  overflow: hidden;
  width: 100%;
  height: 100%;
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /*overflow: hidden;*/
}

.hidden >>> .el-aside {
  height: 100vh;
  background-color: #ffffff;
  overflow-y: auto;
  -ms-overflow-style: none; /* Edge */
  scrollbar-width: none; /* Firefox */
}

.hidden01 >>> ::-webkit-scrollbar {
  display: none; /* WebKit */
}

</style>
