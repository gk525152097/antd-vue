import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import defaultSettings from './defaultSettings'

NProgress.configure({ showSpinner: false }) // NProgress configuration

const whiteList = ['/user/login', '/user/register'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  // 获取本地tagviews缓存并作创建
  if (localStorage.getItem('tagsView')) {
    const tags = JSON.parse(localStorage.getItem('tagsView'))
    for (let i = 0; i < tags.length; i += 1) {
      store.dispatch('addVisitedViews', tags[i])
    }
  }
  // 加载条
  NProgress.start()
  // 切换浏览窗口名称
  if (to.name) {
    document.title = `${defaultSettings.objectName} ${to.name}`
  }
  // 获取本地角色 并请求 路由
  if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).role) {
    // 当前页为登录页或注册页时 直接跳转
    if (to.path === '/user/login' || to.path === '/user/register') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 判断当前角色是否存在
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
