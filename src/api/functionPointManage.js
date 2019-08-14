import request from '@/utils/request'

// 获取 功能 列表
export function getTableList (params) {
  return request({
    url: '/functionPoint/list',
    method: 'POST',
    data: { ...params }
  })
}

// 新增 功能点
export function handleAdd (params) {
  return request({
    url: '/functionPoint/add',
    method: 'POST',
    data: { ...params }
  })
}

// 修改 功能点
export function handleEdit (params) {
  return request({
    url: '/functionPoint/edit',
    method: 'POST',
    data: { ...params }
  })
}

// 删除 功能修
export function handleDelete (params) {
  return request({
    url: '/functionPoint/delete',
    method: 'POST',
    data: { ...params }
  })
}
