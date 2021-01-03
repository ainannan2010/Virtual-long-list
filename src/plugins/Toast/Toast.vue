<template>
  <div class="toast">
    <div class="box" v-if="showTag">{{msg}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '这是一个插件',
      showTag: false
    }
  },
}
</script>

<style lang="less" scoped>
.box {
  width: 80%;
  height: 80px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #00dd00;
  line-height: 80px;
  text-align: center;
  color:#fff;
}
</style>
