import Vue from 'vue'
import Router from 'vue-router'
import userLayout from '../view/layout/userLayout' // BaseLayout

// import HelloWorld from '@/components/HelloWorld'
// import baseLayout from '../view/layout/baseLayout' // BaseLayout

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
  { path: '/404', name: '404', component: () => import('@/view/404'), hidden: true }
// ,
//   {
//     path: '/',
//     name: '首页',
//     icon: 'dashboard',
//     component: baseLayout,
//     redirect: '/dashboard',
//     children: [{
//       path: 'dashboard',
//       name: 'Dashboard',
//       component: () => import('@/view/dashboard/index')
//     }]
//   },
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
