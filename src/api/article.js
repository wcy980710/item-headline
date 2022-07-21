import request from '@/utils/requst'
/**
 * 获取频道的文章列表
 */
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
