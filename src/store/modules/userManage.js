import {
  handleList
} from '@/api/userManage'

const usermanage = {
  state: {
    userListLoading: false,
    list: []
  },

  mutations: {
    HANDLE_LIST_LOADING: (state) => {
      state.userListLoading = !state.userListLoading
    },
    HANDLE_LIST: (state, data) => {
      state.list = data
    }
  },

  actions: {
    // 切换列表加载状态
    handleListLoading ({ commit }) {
      commit('HANDLE_LIST_LOADING')
    },
    handleList({ commit }, data) {
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
    }
  }
}

export default usermanage
