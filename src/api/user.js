import request from '@/utils/request'

export function login (params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
