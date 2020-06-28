import request from '@/utils/request'

export function deletePhoto(data) {
  return request({
    url: '/shared/deleteIMG',
    method: 'post',
    data
  })
}

export async function updateProduct(productCode, data) {
  return request({
    url: `/products/${productCode}`,
    method: 'put',
    data
  })
}

export async function getPKGWithSmallestUnit(id) {
  return request({
    url: `/units/${id}`,
    method: 'get'
  })
}

export async function getSupplierList() {
  return request({
    url: '/suppliers/all',
    method: 'get'
  })
}

export async function getProductList(params) {
  return request({
    url: '/products',
    method: 'get',
    params
  })
}

export async function getPOSProductList(params) {
  return request({
    url: '/products/pos',
    method: 'get',
    params
  })
}

export async function createProduct(data) {
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
