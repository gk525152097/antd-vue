<template>
  <div class="operation">
    <!-- 文字提示 -->
    <div class="operation-item">
      <HeaderMessage />
    </div>
    <!-- 消息栏 -->
    <div class="operation-item">
      <HeaderInfo />
    </div>
    <!-- 用户菜单 -->
    <div class="operation-item">
      <HeaderMenu />
    </div>
  </div>
</template>

<script>
import HeaderMenu from './headerMenu'
import HeaderInfo from './headerInfo'
import HeaderMessage from './headerMessage'
export default {
  name: 'header',
  components: {
    HeaderMenu,
    HeaderInfo,
    HeaderMessage
  }
}
</script>

<style lang="scss" scoped>
  .operation {
    float: right;
    padding: 0 40px;
    .operation-item {
      display: inline-block;
      margin: 0 8px;
    }
  }
</style>
