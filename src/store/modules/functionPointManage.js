import {
  getTableList,
  handleAdd,
  handleEdit,
  handleDelete
} from '@/api/functionPointManage'

const functionpointmanage = {
  namespaced: true,

  state: {
    tableList: {
      list: [],
      total: 0
    },
    searchInfo: {},
    tableLoading: false,
    page: 0,
    pageSize: 20
  },

  mutations: {
    HANDLE_TABLE_LOADING: (state) => {
      state.tableLoading = !state.tableLoading
    },
    HANDLE_PAGINATION: (state, data) => {
      state.page = data.page
      state.pageSize = data.pageSize
    },
    SET_TABLE_LIST: (state, data) => {
      state.tableList = data
    },
    HANDLE_SEARCH_INFO: (state, data) => {
      state.searchInfo = data
    }
  },

  actions: {
    handleTableLoading ({ commit }) {
      commit('HANDLE_TABLE_LOADING')
    },
    handlePagination ({ commit }, data) {
      commit('HANDLE_PAGINATION', data)
    },
    handleSearchInfo ({ commit }, data) {
      commit('HANDLE_SEARCH_INFO', data)
    },
    handleTableList ({ commit }, data) {
      return new Promise((resolve, reject) => {
        getTableList(data)
          .then(res => {
            commit('SET_TABLE_LIST', res.data)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    handleAdd ({ commit }, data) {
      return new Promise((resolve, reject) => {
        handleAdd(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    handleEdit ({ commit }, data) {
      return new Promise((resolve, reject) => {
        handleEdit(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    handleDelete ({ commit }, data) {
      return new Promise((resolve, reject) => {
        handleDelete(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default functionpointmanage
