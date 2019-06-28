import { getMenuList, addMenu, removeMenu, updateMenu } from '@/api/menuManage'

const menumanage = {
  state: {
    list: [
      {title: 'root', key: 0}
    ]
  },

  mutations: {
    SET_MENU_LIST: (state, data) => {
      state.list = data
    }
  },

  actions: {
    addMenu (_, data) {
      return new Promise((resolve, reject) => {
        console.log(data)
        addMenu(data)
          .then(results => {
            resolve(results)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    removeMenu (_, data) {
      return new Promise((resolve, reject) => {
        console.log(data)
        removeMenu(data)
          .then(results => {
            resolve(results)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updateMenu (_, data) {
      return new Promise((resolve, reject) => {
        console.log(data)
        updateMenu(data)
          .then(results => {
            resolve(results)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getMenuList ({commit}) {
      return new Promise((resolve, reject) => {
        getMenuList()
          .then(results => {
            commit('SET_MENU_LIST', results.data)
            resolve(results)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default menumanage
