import request from '@/utils/request'

// 获取角色列表
export function getRoleList (params) {
  return request({
    url: '/authority/role',
    method: 'POST',
    data: { ...params }
  })
}

// 获取菜单树
export function getMenuTree (params) {
  return request({
    url: '/authority/tree',
    method: 'POST',
    data: { ...params }
  })
}

// 修改权限
export function handleAuthority (params) {
  return request({
    url: '/authority/handleAuthority',
    method: 'POST',
    data: { ...params }
  })
}
