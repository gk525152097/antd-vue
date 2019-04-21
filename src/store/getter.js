const getters = {
  user: state => state.user.user,
  routes: state => state.permission.routes,
  visitedviews: state => state.tagsview.visitedviews
}

export default getters
