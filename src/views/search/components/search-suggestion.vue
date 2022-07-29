<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <template #title>
        <span v-html="highlightText(text)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'

// lodash 支持按需加载，有利于打包结果优化
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 参数1：函数
      // 参数2：防抖时间
      // ps:注意这里不能用箭头函数 会改变this指向问题
      handler: debounce(function (val) {
        // console.log('===val', val)
        this.loadSearchSuggestion(val)
      }, 200),
      immediate: true // 首次监视触发
    }
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestions = data.data.options.filter((it) => it)
      } catch (err) {
        this.$toast('获取失败')
      }
    },
    highlightText(text) {
      const highlightStr = `<span style='color:red'>${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style scoped lang="less"></style>
