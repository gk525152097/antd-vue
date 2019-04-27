import request from '@/utils/request'

// 登陆
export function login (params) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: { ...params }
  })
}

// 获取菜单
export function getMenu (params) {
  return request({
    url: '/user/getMenu',
    method: 'POST',
    data: { ...params }
  })
}
