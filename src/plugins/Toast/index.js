import ToastComponent from './Toast.vue'

const Toast = {}
Toast.install = function(Vue, options) {
  // 将Toast再次继承一下ToastComponent的整个属性和方法
  const ToastConstructor = Vue.extend(ToastComponent)
  // 实例化出一个对象， 只对整个实例操作
  const instance = new ToastConstructor()
  // 将创建好的实例组件挂载到body的div上
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)
  // 将整个命令或者方法挂载到vue对象上
  Vue.prototype.$toast = (msg, duration = 2000) => {
    instance.msg = msg
    instance.showTag = true
    const timer = setTimeout(() => {
      instance.showTag = false
      clearTimeout(timer)
    }, duration);
  }
}

export default Toast
