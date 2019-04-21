import { getMenu } from '@/api/user'
import { constantRoutes } from '@/router'
import baseLayout from '@/view/layout/baseLayout'

const buildRoutes = (menuList) => {
  menuList = menuList.map(menu => {
    if (menu.children) {
      menu.children = buildRoutes(menu.children)
    }
    if (menu.component.length === 0) {
      delete menu.component
    } else if (menu.component === 'baseLayout') {
      menu.component = baseLayout
    } else {
      menu.component = (_ => () => import('@/view' + _))(menu.component)
    }
    return menu
  })
  return menuList
}

const add404Routes = (menuList) => {
  const route = buildRoutes(menuList)
  route.push({ path: '*', redirect: '/404', hidden: true })
  return route
}

const user = {
  state: {
    routes: [],
    addRoutes: []
  },

  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    RESET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = routes
    }
  },

  actions: {
    GetMenu ({ commit }, role) {
      return new Promise((resolve, reject) => {
        getMenu(role).then(res => {
          commit('SET_ROUTES', res.data)
          resolve(add404Routes(res.data))
        }).catch(error => {
          reject(error)
        })
      })
    },
    ResetMenu ({ commit }, routes) {
      commit('RESET_ROUTES', routes)
    }
  }
}

export default user
