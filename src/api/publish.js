import request from '@/utils/request'

// 生成接口
export function Publish(id) {
  const data = {
    article: {
      _id: id
    }
  }
  return request({
    url: '/admin/publish',
    method: 'post',
    data: data
  })
}
