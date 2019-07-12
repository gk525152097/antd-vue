import {
  getRoleList,
  getMenuTree
} from '@/api/authorityManage'

const authoritymanage = {
  state: {
    roleList: [],
    menuTree: []
  },

  mutations: {
    SET_ROLE_LIST: (state, data) => {
      state.roleList = data
    },
    SET_MENU_TREE: (state, data) => {
      state.menuTree = data
    }
  },

  actions: {
    getRoleList ({ commit }) {
      return new Promise((resolve, reject) => {
        getRoleList()
          .then(res => {
            commit('SET_ROLE_LIST', res.data)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getMenuTree ({ commit }) {
      return new Promise((resolve, reject) => {
        getMenuTree()
          .then(res => {
            commit('SET_MENU_TREE', res.data)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default authoritymanage
