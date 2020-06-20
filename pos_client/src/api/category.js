import request from '@/utils/request'

export function createCategory(data) {
  return request({
    url: '/category',
    method: 'post',
    data
  })
}
export function getCategory(params) {
  return request({
    url: '/category',
    method: 'get',
    params
  })
}
export function updateCategory(categoryCode, data) {
  return request({
    url: `/category/${categoryCode}`,
    method: 'put',
    data
  })
}

export function deleteCategory(data) {
  return request({
    url: `/category/delete`,
    method: 'post',
    data
  })
}
