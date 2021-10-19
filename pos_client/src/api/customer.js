import request from '@/utils/request'

export function getCustomerList(params) {
  return request({
    url: '/customers',
    method: 'get',
    params
  })
}

export function getShippingByCustomerId(id) {
  return request({
    url: `/customers/shipping/${id}`,
    method: 'get'
  })
}

export async function exportExcelCustomerList() {
  return request({
    url: '/customers/All',
    method: 'get'
  })
}

export function createCustomer(data) {
  return request({
    url: '/customers',
    method: 'post',
    data
  })
}

export function updateCustomer(id, data) {
  return request({
    url: `/customers/${id}`,
    method: 'put',
    data
  })
}

export function deleteCustomer(data) {
  return request({
    url: `/customers/delete`,
    method: 'post',
    data
  })
}
