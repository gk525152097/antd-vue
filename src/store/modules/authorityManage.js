import {
  getRoleList,
  getMenuTree,
  handleAuthority
} from '@/api/authorityManage'

const authoritymanage = {
  state: {
    roleList: [],
    menuTree: [],
    role: {}
  },

  mutations: {
    SET_ROLE_LIST: (state, data) => {
      state.roleList = data
    },
    SET_MENU_TREE: (state, data) => {
      state.menuTree = data
    },
    HANDLE_ROLE: (state, data) => {
      state.role = data
    }
  },

  actions: {
    // 获取角色列表
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
    // 获取权限树
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
    },
    // 选择角色
    handleRole ({ commit }, data) {
      commit('HANDLE_ROLE', data)
    },
    // 提交权限
    handleAuthority ({ commit }, data) {
      return new Promise((resolve, reject) => {
        handleAuthority(data)
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    }
  }
}

export default authoritymanage
