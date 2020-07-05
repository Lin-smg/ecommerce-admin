import request from '@/utils/request'

export async function createPOSPay(data) {
  return request({
    url: '/pos/posPay',
    method: 'post',
    data
  })
}

export async function createPOSOrder(data) {
  return request({
    url: '/pos/posOrder',
    method: 'post',
    data
  })
}

export async function getCreditReceiptByCustomer(customerId) {
  return request({
    url: '/pos/' + customerId,
    method: 'get'
  })
}
