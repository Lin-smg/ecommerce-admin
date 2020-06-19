import request from '@/utils/request'

export function createCategory(data) {
  return request({
    url: '/category',
    method: 'post',
    data
  })
}
export function getCategory() {
  return request({
    url: '/category',
    method: 'get'
  })
}
export function updateCategory(id, data) {
  return request({
    url: `/category/${id}`,
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
