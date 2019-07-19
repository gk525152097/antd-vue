
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
