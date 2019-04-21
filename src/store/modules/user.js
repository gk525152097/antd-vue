import { login } from '@/api/user'

const user = {
  state: {
    user: {
      role: 'guest',
      introduction: 'I am a guest',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'guest'
    }
  },

  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      userInfo.userName = userInfo.userName.trim()
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          commit('SET_USER', res.data)
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
