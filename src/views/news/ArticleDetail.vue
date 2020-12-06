<template>
  <div class="el-dev-header">
    <div class="el-dev-title">
      <span @click="$router.go(-1)">&lt;&lt;&lt;</span>
      {{$route.params.id}}
    </div>
    <div class="el-dev-action"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '新闻',
    }
  },
  created() {},
}
</script>

<style scoped lang='less'>
.el-dev-header {
  width: 100%;
  height: 60px;
  line-height: 50px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: red;
  color: #fff;
}
</style>
