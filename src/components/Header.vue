<template>
  <div class="el-dev-header">
    <div class="el-dev-title">{{title}}</div>
    <div class="el-dev-action">
      <img
        src="~@/img/user.png"
        alt
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '新闻',
    }
  },
}
</script>

<style scoped lang='less'>
.el-dev-header {
  width: 100%;
  height: 60px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: red;
  color: #fff;
  .el-dev-title {
    margin-left: 5px;
  }
  .el-dev-action {
    display: flex;
    align-items: center;
    margin-right: 5px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}
</style>
