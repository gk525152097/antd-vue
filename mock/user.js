const tokens = {
  admin: {
    role: 'admin',
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  user: {
    role: 'user',
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const roleMenu = {
  admin: [
    {
      path: '/',
      name: '首页',
      icon: 'dashboard',
      component: 'baseLayout',
      redirect: '/dashboard',
      children: [{
        path: 'dashboard',
        name: 'Dashboard',
        component: '/dashboard/index'
      }]
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
        code: 20000,
        data
      }
    }
    return {
      code: 60204,
      message: 'Account and password are incorrect.'
    }
  },
  logout: () => {
    return {
      code: 20000,
      data: 'success'
    }
  },
  getMenu: res => {
    return {
      code: 20000,
      data: roleMenu[JSON.parse(res.body).role]
    }
  }
}
