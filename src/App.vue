<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>>

<style lang="less">
// 引入公共样式
@import url('./assets/css/basic.css');
// 引入公共图标
@import url('./assets/font-awesome/css/font-awesome.min.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // max-width: 1640px;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
