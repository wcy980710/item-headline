<template>
  <div class="shouye-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 实现滑动导航 -->
    <!--
        通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签
        通过animated属性可以开启切换标签内容时的转场动画
        通过swipeable属性可以开启滑动切换标签页
        -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        v-for="(item, index) in channels"
        :key="index"
        :title="item.name"
      >
        <!-- 文章列表 -->
        <article-list :channel="item" />
        <!-- /文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /实现滑动导航 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'ShouyeIndex',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 1,
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道列表数据失败', err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.shouye-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
  }
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
.search-btn {
  width: 555px;
  height: 64px;
  background-color: #5babfb;
  border: none;
  font-size: 28px;
  .van-icon {
    font-size: 32px;
  }
}

/deep/ .channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }

  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777777;
  }

  .van-tab--active {
    color: #333333;
  }

  .van-tabs__nav {
    padding-bottom: 0;
  }

  .van-tabs__line {
    bottom: 8px;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }
}

.placeholder {
  //占位元素为了解决最后一个tab标签被汉堡盖住问题（看下边的图）
  flex-shrink: 0; //此元素不参与flex的
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
  &:before {
    //找到父节点，添加伪元素（这个是汉堡按钮与tab之间的一个竖线）
    content: "";
    position: absolute;
    left: 0;
    width: 1px; //在模拟器上看不到（手机上没问题），如果想看到改为2px
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
</style>
