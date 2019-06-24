import request from '@/utils/request'

// 获取角色列表
export function getRoleList (params) {
  return request({
    url: '/role/list',
    method: 'POST',
    data: { ...params }
  })
}

// 新增角色
export function addRole (params) {
  return request({
    url: '/role/add',
    method: 'POST',
    data: { ...params }
  })
}

// 删除角色
export function removeRole (params) {
  return request({
    url: '/role/remove',
    method: 'POST',
    data: { ...params }
  })
}

// 更新角色
export function updateRole (params) {
  return request({
    url: '/role/update',
    method: 'POST',
    data: { ...params }
  })
}
