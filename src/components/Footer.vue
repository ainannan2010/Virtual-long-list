<template>
  <div class="el-dev-footer">{{text}}</div>
</template>

<script>
export default {
  data() {
    return {
      text: '越努力，越幸运。go wy！',
    }
  },
}
</script>

<style scoped lang='less'>
.el-dev-footer {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #eee;
}
</style>
