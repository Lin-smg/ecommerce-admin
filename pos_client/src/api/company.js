import request from '@/utils/request'

export function createCompany(data) {
  return request({
    url: '/company',
    method: 'post',
    data
  })
}

export function getCompany() {
  return request({
    url: '/company',
    method: 'get'
  })
}
