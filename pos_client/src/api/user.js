import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function deletePhoto(data) {
  return request({
    url: '/shared/deleteIMG',
    method: 'post',
    data
  })
}

export function updateUser(userid, data) {
  return request({
    url: `/users/${userid}`,
    method: 'put',
    data
  })
}

export function getInfo() {
  return request({
    url: '/users/info',
    method: 'get'
  })
}

export async function getUserList(params) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}

export function createUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/users/delete',
    method: 'post',
    data
  })
}
