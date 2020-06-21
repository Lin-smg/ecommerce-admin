import request from '@/utils/request'

export function createWarehouse(data) {
  return request({
    url: '/warehouse',
    method: 'post',
    data
  })
}

export function deleteWarehouse(data) {
  return request({
    url: '/warehouse/delete',
    method: 'post',
    data
  })
}

export function getWarehouseList(params) {
  return request({
    url: '/warehouse',
    method: 'get',
    params
  })
}

export function updateWarehouse(id, data) {
  return request({
    url: `/warehouse/${id}`,
    method: 'put',
    data
  })
}
