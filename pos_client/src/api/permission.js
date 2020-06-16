import request from '@/utils/request'

export function createPermissionGroup(data) {
  return request({
    url: '/permission',
    method: 'post',
    data
  })
}

export function getPermissionGroupList(params) {
  return request({
    url: '/permission',
    method: 'get',
    params
  })
}

export function updatePermissionGroup(groupCode, data) {
  return request({
    url: `/permission/${groupCode}`,
    method: 'put',
    data
  })
}

export function deletePermissionGroup(data) {
  return request({
    url: `/permission/delete`,
    method: 'post',
    data
  })
}
