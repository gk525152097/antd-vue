import request from '@/utils/request'

// 获取用户列表
export function handleList (params) {
  return request({
    url: '/users/list',
    method: 'POST',
    data: { ...params }
  })
}

// 获取角色列表
export function handleRoleList (params) {
  return request({
    url: '/users/roleList',
    method: 'POST',
    data: { ...params }
  })
}

// 新增用户
export function handleAdd (params) {
  return request({
    url: '/users/add',
    method: 'POST',
    data: { ...params }
  })
}

// 删除用户
export function handleDelete (params) {
  return request({
    url: '/users/delete',
    method: 'POST',
    data: { ...params }
  })
}

// 编辑用户
export function handleEdit (params) {
  return request({
    url: '/users/edit',
    method: 'POST',
    data: { ...params }
  })
}
