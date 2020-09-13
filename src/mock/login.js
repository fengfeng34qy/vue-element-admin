import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  loginByUsername: config => {
    const { user } = JSON.parse(config.body)
    console.log('用户', userMap[user.name])
    return userMap[user.name]
    // const { username } = JSON.parse(config.body)
    // console.log('用户', userMap[username])
    // return userMap[username]
  },
  getUserInfo: config => {
    console.log('getUserInfo', config)
    const { token } = param2Obj(config.url)
    console.log(token)
    if (userMap[token]) {
      console.log('用户信息', userMap[token])
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
