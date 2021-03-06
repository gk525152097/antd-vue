const tokens = {
  admin: {
    role: 'admin',
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  user: {
    role: 'user',
    introduction: 'I am an user',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal User'
  }
}

const roleMenu = {
  admin: [
    {
      path: '/',
      name: '首页',
      icon: 'dashboard',
      component: 'baseLayout',
      redirect: '/analysis',
      children: [
        {
          path: '/analysis',
          name: '分析页',
          component: '/analysis/index'
        },
        {
          path: '/monitor',
          name: '监控页',
          component: '/monitor/index'
        }
      ]
    },
    {
      path: '/table',
      name: '列表',
      icon: 'dashboard',
      component: 'baseLayout',
      redirect: '/table/commonTable',
      children: [
        {
          path: '/table/commonTable',
          name: 'commonTable',
          component: '/dashboard/index'
        },
        {
          path: '/table/commonTable1',
          name: 'commonTable1',
          component: '/analysis/index'
        }
      ]
    }
  ],
  user: [
    {
      path: '/',
      name: 'user',
      icon: 'dashboard',
      component: 'baseLayout',
      redirect: '/dashboard',
      children: [{
        path: 'dashboard',
        name: 'Dashboard',
        component: '/dashboard/index'
      }]
    }
  ]
}

export default {
  login: res => {
    const { userName } = JSON.parse(res.body)
    const data = tokens[userName]
    if (data) {
      return {
        code: 200,
        data
      }
    }
    return {
      code: 500,
      message: 'Account and password are incorrect.'
    }
  },
  logout: () => {
    return {
      code: 200,
      data: 'success'
    }
  },
  getMenu: res => {
    return {
      code: 200,
      data: roleMenu[JSON.parse(res.body).role]
    }
  }
}
