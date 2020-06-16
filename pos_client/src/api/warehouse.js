import request from '@/utils/request'

export function createWarehouse(data) {
  return request({
    url: '/warehouse',
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
    method: 'post',
    data
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
