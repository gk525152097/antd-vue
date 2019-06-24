import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter.js'
import tagsView from './modules/tagsview.js'
import user from './modules/user.js'
import permission from './modules/permission.js'
import rolemanage from './modules/roleMange.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    tagsView,
    user,
    permission,
    rolemanage
  },
  getters
})

export default store
