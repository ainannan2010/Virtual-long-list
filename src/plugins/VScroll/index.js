import VScrollComponent from './VScroll.vue'

const vscroll = {}

vscroll.install = function (Vue) {
  // 全局注册组件
  Vue.component('VScroll', VScrollComponent)
}

export default vscroll
