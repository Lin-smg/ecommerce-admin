import request from '@/utils/request'

export function deletePhoto(data) {
  return request({
    url: '/shared/deleteIMG',
    method: 'post',
    data
  })
}

export function updatProductr(productCode, data) {
  return request({
    url: `/products/${productCode}`,
    method: 'put',
    data
  })
}

export async function getProductList(params) {
  return request({
    url: '/products',
    method: 'get',
    params
  })
}

export function createProduct(data) {
  return request({
    url: '/products',
    method: 'post',
    data
  })
}

export function deleteProduct(data) {
  return request({
    url: '/products/delete',
    method: 'post',
    data
  })
}
