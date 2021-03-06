import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
import { TOKEN_KEY } from '@/constDaochu/daochuConst'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 一个对象,储存当前登录用户信息(token等数据) 注意本地存的数据为字符串格式(包装好)
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失,我们需要把数据备份到本地存储 注意格式转换
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
