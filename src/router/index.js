import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      key: '1',
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      routes: [
        {
          key: '1.1',
          path: '/HelloWorld1',
          name: 'HelloWorld1',
          component: HelloWorld
        }
      ]
    },
    {
      key: '2',
      path: '/test',
      name: 'test',
      component: HelloWorld,
      routes: [
        {
          key: '2.1',
          path: '/test1',
          name: 'test1',
          component: HelloWorld
        },
        {
          key: '2.2',
          path: '/test2',
          name: 'test2',
          component: HelloWorld,
          routes: [
            {
              key: '2.2.1',
              path: '/test1',
              name: 'test1',
              component: HelloWorld
            },
            {
              key: '2.2.2',
              path: '/test1',
              name: 'test1',
              component: HelloWorld
            }
          ]
        }
      ]
    }
  ]
})
