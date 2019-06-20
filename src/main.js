// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import '@/assets/styles/global.scss'
import '@/permission' // permission control
import '../mock' // mock
import defaultSettings from './defaultSettings'

Vue.config.productionTip = defaultSettings.productionTip // 开启chrome浏览器插件功能
Vue.config.devtools = true
Vue.prototype.$axios = axios
Vue.use(Antd)

// Date.prototype.toLocaleString = () => { // eslint-diabled-line
//   return `${this.getFullYear()}/${(Array(2).join(0) + (this.getMonth() + 1)).slice(-2)}/${(Array(2).join(0) + this.getDate()).slice(-2)} ${(Array(2).join(0) + this.getHours()).slice(-2)}:${(Array(2).join(0) + this.getMinutes()).slice(-2)}:${(Array(2).join(0) + this.getSeconds()).slice(-2)}`
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
