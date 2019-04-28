<template>
  <div class="error-page-wrapper">
    <div class="content">
      <div>
        <h1>404</h1>
        <p>抱歉，您访问的页面不存在，请确认页面路径是否正确！</p>
      </div>
      <router-link to="/dashboard">
        <a-button>返回首页</a-button>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message () {
      return '网管说这个页面你不能进......'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.error-page-wrapper {
  background: #fff;
  text-align: center;
  min-height: 578px;
  display: flex;
  align-items: center;
  .content {
    margin: 0 auto;
  }
}
</style>
