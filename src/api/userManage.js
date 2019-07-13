import request from '@/utils/request'

// 获取用户列表
export function handleList (params) {
  return request({
    url: '/users/list',
    method: 'POST',
    data: { ...params }
  })
}
