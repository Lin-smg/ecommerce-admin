import request from '@/utils/request'

export function getSupplierList(params) {
  return request({
    url: '/suppliers',
    method: 'get',
    params
  })
}

export function createSupplier(data) {
  return request({
    url: '/suppliers',
    method: 'post',
    data
  })
}

export function updateSupplier(id, data) {
  return request({
    url: `/suppliers/${id}`,
    method: 'put',
    data
  })
}

export function deleteSupplier(data) {
  return request({
    url: `/suppliers/delete`,
    method: 'post',
    data
  })
}
