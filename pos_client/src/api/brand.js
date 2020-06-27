import request from '@/utils/request'

export function getBrandList(params) {
  return request({
    url: '/brand',
    method: 'get',
    params
  })
}

export function createBrand(data) {
  return request({
    url: '/brand',
    method: 'post',
    data
  })
}

export function updateBrand(brandCode, data) {
  return request({
    url: `/brand/${brandCode}`,
    method: 'put',
    data
  })
}

export function deleteBrand(data) {
  return request({
    url: `/brand/delete`,
    method: 'post',
    data
  })
}
