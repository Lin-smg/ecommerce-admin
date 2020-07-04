import request from '@/utils/request'

export async function savePurchaseData(data) {
  return request({
    url: '/pos/purchase',
    method: 'post',
    data
  })
}
