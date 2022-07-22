<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? "完成" : "编辑" }}
      </van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="channel.id"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fixedChannels.includes(channel.id)"
        ></van-icon>
        <span :class="{ active: index === active, text: true }" slot="text">
          {{ channel.name }}
        </span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fixedChannels: [0]
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(
        (it) => !this.myChannels.find((channel) => +channel.id === +it.id)
      )
    },
    ...mapState(['user'])
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      // 1. 如果未登录 && 有本地数据：使用本地数据
      const channels = getItem('TOUTIAO_CHANNELS')
      if (!this.user && channels) {
        this.allChannels = channels
      } else {
        // 2. 获取远程数据
        try {
          const { data } = await getAllChannels()
          this.allChannels = data.data.channels
        } catch (err) {}
      }
    },
    async onAddChannel (channel) {
      /* eslint-disable-next-line */
      this.myChannels.push(channel);
      if (this.user) {
        // 存储远程服务器
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('添加失败')
        }
      } else {
        // 存储本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        if (this.fixedChannels.includes(channel.id)) {
          return
        }

        /* eslint-disable-next-line */
        this.myChannels.splice(index, 1);

        if (index <= this.active) {
          this.$emit('update-active', index - 1)
        }

        // 持久化数据
        this.deleteChannel(channel)
      } else {
        this.$emit('update-active', index, false)
      }
    },
    // 删除时持久化存储频道数据
    async deleteChannel (channel) {
      if (!this.user) {
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      } else {
        try {
          await deleteUserChannel(channel.id)
          this.$toast('删除成功')
        } catch (err) {
          this.$toast('删除失败')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
}
/deep/ .grid-item {
  width: 160px;
  height: 86px;
  .van-grid-item__content {
    white-space: nowrap;
    background-color: #f4f5f6;
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222;
      margin-top: 0;
    }
    .active {
      color: red;
    }
  }
}

/deep/ .recommend-grid {
  .grid-item {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}

/deep/ .my-grid {
  .grid-item {
    .van-icon-clear {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 30px;
      color: #cacaca;
      z-index: 2;
    }
  }
}
</style>
