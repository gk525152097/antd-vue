import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      key: '1',
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: () => import('@/layout/baseRouter'), // 需要用一个空路由做基础以提供子路由出口
      children: [
        {
          key: '1.1',
          path: '/HelloWorld/HelloWorld1',
          name: 'HelloWorld1',
          component: () => import('@/components/HelloWorld')
        }
      ]
    },
    {
      key: '2',
      path: '/test',
      name: 'UserManage',
      component: () => import('@/layout/baseRouter'),
      children: [
        {
          key: '2.1',
          path: '/User/user',
          name: 'User',
          component: () => import('@/components/User')
        },
        {
          key: '2.2',
          path: '/test2',
          name: 'test2',
          component: () => import('@/layout/baseRouter'),
          children: [
            {
              key: '2.2.1',
              path: '/test3',
              name: 'test4',
              component: () => import('@/components/HelloWorld')
            },
            {
              key: '2.2.2',
              path: '/test1',
              name: 'test1',
              component: () => import('@/components/HelloWorld')
            }
          ]
        }
      ]
    },
    {
      key: '3',
      path: '/home',
      name: 'Home',
      component: () => import('@/components/Home')
    },
    {
      key: '4',
      path: '/home/test',
      name: 'Home',
      component: () => import('@/components/HelloWorld')
    }
  ]
})
