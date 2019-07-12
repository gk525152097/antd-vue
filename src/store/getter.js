const getters = {
  user: state => state.user.user,
  routes: state => state.permission.routes,
  visitedviews: state => state.tagsView.visitedviews,
  rolemanage: state => state.rolemanage,
  menumanage: state => state.menumanage,
  authoritymanage: state => state.authoritymanage
}

export default getters
