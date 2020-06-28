import request from '@/utils/request'

export async function createPOSPay(data) {
  return request({
    url: '/posPay',
    method: 'post',
    data
  })
}

export async function createPOSOrder(data) {
  return request({
    url: '/posPending',
    method: 'post',
    data
  })
}
