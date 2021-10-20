import request from '@/utils/request'

export function getAllOrder(params) {
  return request({
    url: '/order',
    method: 'get',
    params
  })
}

export function getOrderByOrderNo(orderNo) {
  return request({
    url: `/order/${encodeURIComponent(orderNo)}`,
    method: 'get'
  })
}

export function getOrderByCustomerId(id) {
  return request({
    url: `/client/order/customer/${encodeURIComponent(id)}`,
    method: 'get'
  })
}

export function getOrderItemByOrderNo(orderNo) {
  return request({
    url: `/order/orderItem/${encodeURIComponent(orderNo)}`,
    method: 'get'
  })
}

export function updateOrder(orderNo, data) {
  console.log(data)
  return request({
    url: `/order/${encodeURIComponent(orderNo)}`,
    method: 'put',
    data
  })
}

export function deleteOrder(orderNo) {
  return request({
    url: `/order/${encodeURIComponent(orderNo)}`,
    method: 'delete'
  })
}
