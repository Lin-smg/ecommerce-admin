import request from '@/utils/request'

export function createUnit(data) {
  return request({
    url: '/units',
    method: 'post',
    data
  })
}

export function getUnitList(params) {
  return request({
    url: '/units',
    method: 'get',
    params
  })
}

export function updateUnit(id, data) {
  return request({
    url: `/units/${id}`,
    method: 'put',
    data
  })
}

export function deleteUnit(data) {
  return request({
    url: `/units/delete`,
    method: 'post',
    data
  })
}
