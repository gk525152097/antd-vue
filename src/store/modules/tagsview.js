import store from "../index";

const tagsview = {
  state: {
    visitedviews: [] // 存放所有浏览过的且不重复的路由数据
  },
  mutations: {// 这
    ADD_VISITED_VIEWS: (state, view) => { // 打开新页签--添加路由数据的方法
      if (state.visitedviews.some(v => v.path === view.path)) return
      state.visitedviews.push({
        name: view.name,
        path: view.path
      })
      localStorage.setItem('tagsView', JSON.stringify(state.visitedviews))
    },
    DEL_VISITED_VIEWS: (state, view) => { // 关闭页签--删除路由数据的方法
      const _visitedviews = state.visitedviews.filter(item => item.path !== view.path)
      state.visitedviews = _visitedviews
      localStorage.setItem('tagsView', JSON.stringify(state.visitedviews))
    }
  },
  actions: { // 调用这里去触发mutations，如何调用？在组件内使用this.$store.dispatch('action中对应名字', 参数)
    addVisitedViews ({commit}, view) { // 通过解构赋值得到commit方法
      commit('ADD_VISITED_VIEWS', view) // 去触发ADD_VISITED_VIEWS，并传入参数
    },
    delVisitedViews ({commit}, view) { // 删除数组存放的路由之后，需要再去刷新路由，这是一个异步的过程，需要有回掉函数，所以使用并返回promise对象，也可以让组件在调用的时候接着使用.then的方法
      commit('DEL_VISITED_VIEWS', view)
    }
  }
}
export default tagsview
