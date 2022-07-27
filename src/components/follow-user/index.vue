<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
    >已关注
  </van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { deleteFollow, addFollow } from '@/api/user'
export default {
  // 组件名称
  name: 'followIndex',
  model: {
    prop: 'isFollowed', // 默认是 value
    event: 'update-is_followed' // 默认是 input
  },
  // 组件参数 接收来自父组件的数据
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Number, Object],
      required: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      loading: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async onFollow() {
      this.loading = true // 展示关注按钮的loading 状态
      try {
        if (this.isFollowed) {
          // 已关注，取消关注
          await deleteFollow(this.userId)
        } else {
          // 没有关注，添加关注
          await addFollow(this.userId)
        }
        // 更新视图状态
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        console.log(err)
        let message = '操作失败,请重试!'
        if (err.response && err.response.status === 400) {
          // 如果是400错误，则是关注自己的结果
          message = '你不能关注自已!'
        }
        this.$toast(message)
      }
      this.loading = false // 关闭关注按钮的loading 状态
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {}
}
</script>

<style scoped lang="less"></style>
