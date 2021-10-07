import request from '@/utils/request'

export function createMainCategory(data) {
  return request({
    url: '/main-category',
    method: 'post',
    data
  })
}
export function getMainCategory(params) {
  return request({
    url: '/main-category',
    method: 'get',
    params
  })
}
export function updateMainCategory(categoryCode, data) {
  return request({
    url: `/main-category/${categoryCode}`,
    method: 'put',
    data
  })
}

export function deleteMainCategory(data) {
  return request({
    url: `/main-category/${data.categoryCode}`,
    method: 'delete',
    data
  })
}
