import Vue from 'vue'
import App from './App'
// 导入封装的异步请求
import request from './utils/request'

Vue.config.productionTip = false
// 挂载在vue原型上
Vue.prototype.request = request

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
