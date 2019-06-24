import { getRoleList, addRole, removeRole, updateRole } from '@/api/roleManage'

const rolemanage = {
  state: {
    list: []
  },

  mutations: {
    SET_ROLE_LIST: (state, data) => {
      state.list = data
    }
  },

  actions: {
    addRole (_, data) {
      return new Promise((resolve, reject) => {
        console.log(data)
        addRole(data)
          .then(results => {
            resolve(results)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    removeRole (_, data) {
      return new Promise((resolve, reject) => {
        console.log(data)
        removeRole(data)
          .then(results => {
            resolve(results)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updateRole (_, data) {
      return new Promise((resolve, reject) => {
        console.log(data)
        updateRole(data)
          .then(results => {
            resolve(results)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getRole ({commit}, data) {
      return new Promise((resolve, reject) => {
        console.log(data)
        getRoleList(data)
          .then(results => {
            commit('SET_ROLE_LIST', results.data)
            resolve(results)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default rolemanage
