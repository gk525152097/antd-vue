<template>
    <div class="header-info-item">
      <div class="avatar-wrapper" v-if="avatar">
        <a-avatar class="avatar" :size="36" :src="avatar" />
      </div>
      <div class="content">
        <div class="title" v-if="title">
          <h1  :title="title">{{title}}</h1>
          <div class="status">
            <div><slot name="status" /></div>
          </div>
        </div>
        <p class="text" v-if="text" :title="text">{{text}}</p>
        <span class="time" v-if="time">{{time}}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'HeaderInfoItem',
  props: {
    avatar: '',
    title: {
      type: String,
      default: '',
      required: true
    },
    text: {
      type: String,
      default: '',
      required: true
    },
    time: ''
  }
}
</script>

<style lang="scss" scoped>
.header-info-item {
  border-bottom: 1px solid #e8e8e8;
  display: -webkit-box;
  color: #a8a8a8;
  padding: 8px 0;
  .avatar-wrapper {
    width: 60px;
    display: flex;
    align-items: center;
    .avatar {
      margin: 0 auto;
    }
  }
  .content {
    flex: 1;
    .title {
      display: flex;
      h1 {
        font-size: 18px;
        margin: 0;
        width: 60%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .status {
        flex: 1;
        div {
          float: right;
        }
      }
    }
    .text {
      font-size: 14px;
      margin: 0 0 4px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .time {
      font-size: 12px;
    }
  }
}

</style>
