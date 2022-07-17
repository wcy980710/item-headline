<template>
  <div class="wode-container">
    <div class="header  not-login">
      <!-- 未登录头部 -->
      <div class="header not-login">
        <div class="login-btn" @click="$router.push('/login')">
          <!-- //这里的~不添加也是可以的（在css中是必须添加~才能使用@的） -->
          <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
          <span class="text">登录 / 注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'WoDeIndex',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created () {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted () {}
}
</script>

<style scoped lang="less">
.wode-container {
  .header {
    height: 200px;
    background: url("~@/assets/banner.png"); // css中使用@需要添加~,@代表src
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 99px;
        height: 99px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 18px;
        color: #fff;
      }
    }
  }
}
</style>
