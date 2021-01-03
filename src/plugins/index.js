import Vue from 'vue';
import Toast from './Toast'
import VScroll from './VScroll'

const plugins = {
  Toast,
  VScroll
}

for (const i in plugins) {
  Vue.use(plugins[i])
};
