import Vue from 'vue'
import Router from 'vue-router'
import userLayout from '../view/layout/userLayout' // BaseLayout
import baseLayout from '../view/layout/baseLayout' // BaseLayout

// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/user',
    component: userLayout,
    hidden: true,
    children: [
      { path: 'login', name: 'login', component: () => import('@/view/login/index') },
      { path: 'register', name: 'register', component: () => import('@/view/register/index') }
    ]
  },
  {
    path: '/error',
    component: baseLayout,
    hidden: true,
    children: [
      { path: '404', name: '404', component: () => import('@/view/404'), hidden: true }
    ]
  }
  // {
  //   path: '/menuManage',
  //   name: '菜单管理',
  //   icon: 'dashboard',
  //   component: baseLayout,
  //   redirect: '/menuManage/menuManage',
  //   children: [{
  //     path: '/menuManage/menuManage',
  //     name: 'menuManage',
  //     component: () => import('@/view/menuManage/index'),
  //     hidden: true
  //   }]
  // },
  // {
  //   path: '/roleManage',
  //   name: '角色管理',
  //   icon: 'dashboard',
  //   component: baseLayout,
  //   redirect: '/roleManage/roleManage',
  //   children: [{
  //     path: '/roleManage/roleManage',
  //     name: 'roleManage',
  //     component: () => import('@/view/roleManage/index'),
  //     hidden: true
  //   }]
  // },
  // {
  //   path: '/authorityManage',
  //   name: '权限管理',
  //   icon: 'dashboard',
  //   component: baseLayout,
  //   redirect: '/authorityManage/authorityManage',
  //   children: [{
  //     path: '/authorityManage/authorityManage',
  //     name: 'userManage',
  //     component: () => import('@/view/authorityManage/index'),
  //     hidden: true
  //   }]
  // },
  // {
  //   path: '/userManage',
  //   name: '用户管理',
  //   icon: 'dashboard',
  //   component: baseLayout,
  //   children: [{
  //     path: '/userManage/userManage',
  //     name: 'userManage',
  //     component: () => import('@/view/userManage/index')
  //   }]
  // }
]

export default new Router({
  // mode: 'history',
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
