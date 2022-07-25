<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
看下边的图即可明白
-->
    <form class="search-form" action="/">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" background="#3296fa" @search="onSearch"
        @cancel="onCancel" @focus="isResultShow = false" />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- /搜索结果 -->

    <!-- 联想建议 searchText之前已经在data中添加过了 -->
    <search-suggestion :search-text="searchText" v-else-if="searchText" @search="onSearch" />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else :search-histories="searchHistories" @clear-search-history="searchHistories = []"
      @search="onSearch" />
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchResult from './components/search-result.vue'
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data() {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的显示与否
      searchHistories: [],
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [], // 搜索的历史记录数据
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') ? getItem('TOUTIAO_SEARCH_HISTORIES') : [] // 搜索的历史记录数据
    }
  },

  components: {
    SearchResult, SearchHistory, SearchSuggestion
  },
  watch: {
    searchHistories(value) {
      // 同步到本地存储
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  created() {

  },

  methods: {
    onSearch(val) { // val：输入的关键字
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        // 如果重复,则先删除,然后头部再添加
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val) // 在头部添加
      this.isResultShow = true // 触发搜索，显示搜索结果
    },
    onCancel() {
      this.$router.back() // 返回上一页（首页）
    }
  }
}
</script>

<style scoped lang='less'>
.search-container {
  padding-top: 108px;

  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
