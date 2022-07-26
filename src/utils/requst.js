// **
//  * 封装 axios 请求模块
//  */
import axios from 'axios'
import store from '@/store'
import bigint from 'json-bigint'
const JSONBig = bigint({ storeAsString: true }) // 通过该配置，让超大数字转为字符串

const request = axios.create({
  // create会返回一个新的axios对象，axios.create的详细介绍看当日资料中的离线文章
  baseURL: 'http://toutiao.itheima.net', // 基础路径
  // 自定义后端返回的原始数据
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return JSONBig.parse(data)
      // return JSON.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
export default request
