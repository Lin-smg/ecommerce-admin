import request from '@/utils/request'

export async function getSupplierList(params) {
  return request({
    url: '/suppliers',
    method: 'get',
    params
  })
}

export async function exportExcelSupplierList() {
  return request({
    url: '/suppliers/All',
    method: 'get'
  })
}
export async function createSupplier(data) {
  return request({
    url: '/suppliers',
    method: 'post',
    data
  })
}

export async function updateSupplier(id, data) {
  return request({
    url: `/suppliers/${id}`,
    method: 'put',
    data
  })
}

export async function deleteSupplier(data) {
  return request({
    url: `/suppliers/delete`,
    method: 'post',
    data
  })
}
