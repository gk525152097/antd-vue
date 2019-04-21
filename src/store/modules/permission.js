import { getMenu } from '@/api/user'
import { constantRoutes } from '@/router'
import createRoutes from '@/utils/createRoutes'

const user = {
  state: {
    routes: [],
    addRoutes: []
  },

  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },

  actions: {
    GetMenu ({ commit }, role) {
      return new Promise((resolve, reject) => {
        getMenu(role).then(res => {
          commit('SET_ROUTES', res.data)
          resolve(createRoutes(res.data))
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
