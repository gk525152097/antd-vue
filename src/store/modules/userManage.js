import {
  handleList,
  handleRoleList,
  handleAdd,
  handleDelete,
  handleEdit
} from '@/api/userManage'

const usermanage = {
  namespaced: true,

  state: {
    userListLoading: false,
    list: [],
    roleList: [],
    addLoading: false,
    searchInfo: {},
    page: 0,
    pageSize: 10
  },

  mutations: {
    HANDLE_LIST_LOADING: (state) => {
      state.userListLoading = !state.userListLoading
    },
    HANDLE_LIST: (state, data) => {
      state.list = data
    },
    HANDLE_ROLE_LIST: (state, data) => {
      state.roleList = data
    },
    HANDLE_ADD_LOADING: (state) => {
      state.addLoading = !state.addLoading
    },
    HANDLE_SEARCH_INFO: (state, data) => {
      state.searchInfo = data
    },
    HANDLE_PAGINATION: (state, data) => {
      state.page = data.page
      state.pageSize = data.pageSize
    }
  },

  actions: {
    // 切换列表加载状态
    handleListLoading ({ commit }) {
      commit('HANDLE_LIST_LOADING')
    },
    // 获取用户列表
    handleUserList ({ commit }, data) {
      return new Promise((resolve, reject) => {
        handleList(data)
          .then(res => {
            console.log(res)
            commit('HANDLE_LIST', res.data)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    // 获取角色列表
    handleRoleList ({ commit }) {
      return new Promise((resolve, reject) => {
        handleRoleList()
          .then(res => {
            console.log(res)
            commit('HANDLE_ROLE_LIST', res.data)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    // 切换新增模块Loading
    handleAddModalLoading ({ commit }) {
      commit('HANDLE_ADD_LOADING')
    },
    // 新增用户
    handleAdd (_, data) {
      return new Promise((resolve, reject) => {
        handleAdd(data)
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    // 删除用户
    handleDelete (_, data) {
      return new Promise((resolve, reject) => {
        handleDelete(data)
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    // 编辑用户
    handleEdit (_, data) {
      return new Promise((resolve, reject) => {
        handleEdit(data)
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    // 修改查询条件
    handleSearchInfo ({ commit }, data) {
      return new Promise((resolve) => {
        commit('HANDLE_SEARCH_INFO', data)
        resolve('success')
      })
    },
    // 修改pagination
    handlePagination ({ commit }, data) {
      commit('HANDLE_PAGINATION', data)
    }
  }
}

export default usermanage
