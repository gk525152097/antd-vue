import Vue from 'vue'
import Router from 'vue-router'
import baseLayout from '../view/layout/baseLayout' // BaseLayout
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export const constantRoutes = [
  { path: '/login', name: 'login', component: () => import('@/view/login/index'), hidden: true },
  { path: '/404', name: '404', component: () => import('@/view/404'), hidden: true },

  {
    path: '/',
    name: '首页',
    icon: 'dashboard',
    component: baseLayout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/view/dashboard/index')
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  routes: constantRoutes
})
