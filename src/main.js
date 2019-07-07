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
import defaultSettings from './defaultSettings'

import '../mock' // 不存在动态配置的问题 使用dev模式 需要修改BASE_URL 使用“”空地址会直接请求mock 使用本地IP则会请求实际地址

Vue.config.productionTip = defaultSettings.productionTip // 开启chrome浏览器插件功能
Vue.config.devtools = true
Vue.prototype.$axios = axios
Vue.use(Antd)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
