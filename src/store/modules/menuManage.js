import {
  getMenuList,
  addMenu,
  removeMenu,
  updateMenu,
  handleChangeTree,
  handleMenuInfo
} from '@/api/menuManage'

const menumanage = {
  state: {
    tree: [ // tree
      {title: 'root', key: 0}
    ],
    list: [ // table
      {title: 'root', key: 0}
    ],
    info: { // info
      id: 1,
      icon: 'plus-square',
      name: '根目录',
      path: '/',
      component: '/',
      redirect: null,
      hidden: 0
    },
    treeLoading: false, // tree loading
    infoLoading: false, // info loading
    tableLoading: false, // table loading
    page: 0,
    pageSize: 10
  },

  mutations: {
    SET_MENU_TREE: (state, data) => {
      state.tree = data
    },
    SET_MENU_LIST: (state, data) => {
      state.list = data
    },
    SET_MENU_INFO: (state, data) => {
      state.info = data
    },
    HANDLE_INFO_LOADING: (state) => {
      state.infoLoading = !state.infoLoading
    },
    HANDLE_TREE_LOADING: (state) => {
      state.treeLoading = !state.treeLoading
    },
    HANDLE_TABLE_LOADING: (state) => {
      state.tableLoading = !state.tableLoading
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
    getMenuList ({commit}, data) {
      return new Promise((resolve, reject) => {
        getMenuList(data)
          .then(results => {
            commit('SET_MENU_LIST', results.data)
            resolve(results)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getMenuTree ({commit}) {
      return new Promise((resolve, reject) => {
        getMenuList()
          .then(results => {
            commit('SET_MENU_TREE', results.data)
            resolve(results)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    handleChangeTree ({commit}, data) {
      return new Promise((resolve, reject) => {
        handleChangeTree(data)
          .then(results => {
            console.log(results)
            resolve(results)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    handleMenuInfo ({commit}, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          handleMenuInfo(data)
            .then(results => {
              console.log(results)
              commit('SET_MENU_INFO', results.data[0])
              resolve(results)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      } else {
        return new Promise(resolve => {
          commit('SET_MENU_INFO', {
            icon: 'plus-square',
            name: '根目录',
            path: '/',
            component: '/',
            redirect: null,
            hidden: 0,
            id: 1
          })
          resolve('success')
        })
      }
    },
    handleInfoLoading ({commit}) {
      commit('HANDLE_INFO_LOADING')
    },
    handleTreeLoading ({commit}) {
      commit('HANDLE_TREE_LOADING')
    },
    handleTableLoading ({commit}) {
      commit('HANDLE_TABLE_LOADING')
    }
  }
}

export default menumanage
