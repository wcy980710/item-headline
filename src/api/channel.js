// 获取所有频道列表请求
import request from '@/utils/requst'

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
