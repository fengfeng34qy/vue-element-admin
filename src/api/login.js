import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    name: username,
    password: password
  }
  const user = {
    user: data
  }
  // console.log(user)
  return request({
    url: '/user/signin',
    method: 'post',
    data: user
  })
  // return request({
  //   url: '/login/login',
  //   method: 'post',
  //   data
  // })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

