import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress configuration

const whiteList = ['/user/login', '/user/register'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('tagsView')) {
    const tags = JSON.parse(localStorage.getItem('tagsView'))
    for (let i = 0; i < tags.length; i += 1) {
      store.dispatch('addVisitedViews', tags[i])
    }
  }
  NProgress.start()
  if (to.name) {
    document.title = `antd-vue ${to.name}`
  }
  if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).role) {
    if (to.path === '/user/login' || to.path === '/user/register') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.routes.length) {
        next()
        if (to.path !== '/error/404') {
          store.dispatch('addVisitedViews', to)
        }
      } else {
        store.dispatch('GetMenu', {role: JSON.parse(localStorage.getItem('user')).role})
          .then(GetMenu => {
            router.addRoutes(GetMenu)
            next({ ...to, replace: true })
          })
      }
      NProgress.done()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/user/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
