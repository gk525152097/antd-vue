import request from '@/utils/request'

// 获取角色列表
export function getMenuList (params) {
  return request({
    url: '/menu/list',
    method: 'POST',
    data: { ...params }
  })
}

// 新增角色
export function addMenu (params) {
  return request({
    url: '/menu/add',
    method: 'POST',
    data: { ...params }
  })
}

// 删除角色
export function removeMenu (params) {
  return request({
    url: '/menu/remove',
    method: 'POST',
    data: { ...params }
  })
}

// 更新角色
export function updateMenu (params) {
  return request({
    url: '/menu/update',
    method: 'POST',
    data: { ...params }
  })
}

// 修改菜单树
export function handleChangeTree (params) {
  return request({
    url: '/menu/changeTree',
    method: 'POST',
    data: { ...params }
  })
}
