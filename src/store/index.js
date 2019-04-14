import Vue from 'vue'
import Vuex from 'vuex'
import tagsview from './modules/tagsview.js'
import getters from './getter.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    tagsview
  },
  getters
})

export default store
