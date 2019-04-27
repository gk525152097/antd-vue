<template>
  <div class="header-info-box">
    <transition-group name="fade-transition" mode="out-in" tag="ul">
      <li class="item" v-for="(item, index) in infoList" :key="index" @click="removeItem(index)">
        <header-info-item
          :avatar="item.avatar"
          :title="item.title"
          :text="item.text"
          :time="item.time"
        >
          <template slot="status" v-if="item.status">
            <div class="button-icon" :style="`color:${item.status.color};border-color:${item.status.color}`">{{item.status.text}}</div>
          </template>
        </header-info-item>
      </li>
    </transition-group>
    <ul v-if="!infoList.length">
      <li class="hint">您已阅读所有信息!</li>
    </ul>
    <div class="action">
      <div class="action-item remove" @click="removeAll">
        <span>清除 {{title}}</span>
      </div>
      <div class="action-item more" @click="addMore">
        <span>查看更多</span>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderInfoItem from '../components/HeaderInfoItem'
export default {
  name: 'HeaderInfoBox',
  components: {
    HeaderInfoItem
  },
  props: {
    title: '',
    infoList: {
      type: Array
    }
  },
  methods: {
    removeItem (index) {
      this.$emit('removeItem', index)
    },
    removeAll () {
      for (let i in this.infoList) {
        this.$emit('removeItem', 0)
      }
    },
    addMore () {
      this.$emit('addMore')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-info-box {
  .item:hover {
    cursor: pointer;
    background: #e6f7ff;
  }
  .hint {
    text-align: center;
    padding: 12px;
    border-bottom: 1px solid #e8e8e8;
  }
  .action {
    height: 40px;
    border: 1px solid #e8e8e8;
    border-top: none;
    display: flex;
    .action-item {
      text-align: center;
      display: flex;
      align-items: center;
      &:hover {
        cursor: pointer;
        color: black;
      }
      span {
        margin: 0 auto;
      }
      &.remove {
        width: 50%;
        border-right: 1px solid #e8e8e8;
      }
      &.more {
        flex: 1;
      }
    }
  }
  .button-icon {
    font-size: 8px;
    padding: 1px 8px;
    border: 1px solid;
    border-radius: 4px;
  }
}
</style>
