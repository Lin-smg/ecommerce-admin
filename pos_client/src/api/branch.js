import request from '@/utils/request'

export function getBranchList(params) {
  return request({
    url: '/branch',
    method: 'get',
    params
  })
}

export function createBranch(data) {
  return request({
    url: '/branch',
    method: 'post',
    data
  })
}

export function updateBranch(code, data) {
  return request({
    url: `/branch/${code}`,
    method: 'put',
    data
  })
}

export function deleteBranch(data) {
  return request({
    url: `/branch/delete`,
    method: 'post',
    data
  })
}
