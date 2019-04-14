import Vue from 'vue'
import Vuex from 'vuex'
import tagsView from './modules/tagsview.js'
import user from './modules/user.js'
import getters from './getter.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    tagsView,
    user
  },
  getters
})

export default store
