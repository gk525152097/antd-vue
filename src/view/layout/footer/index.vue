<template>
  <div class="footer">
    <div class="link">
      <a href="https://preview.pro.ant.design/dashboard/analysis" target="_blank">AntDesignPro</a>
      <a-divider type="vertical" />
      <a href="https://vue.ant.design/docs/vue/introduce-cn/"  target="_blank">AntDesignVue</a>
      <a-divider type="vertical" />
      <a href="https://github.com/gk525152097/antd-vue.git" target="_blank"><a-icon type="github" /></a>
    </div>
    Antd-vue ©2019 - {{new Date().toLocaleString().slice(0, 4)}} Created by GK黎光
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style lang="scss" scoped>
  .footer{
    font-size: 14px;
    color: rgba(0,0,0,.45);
    padding: 10px 0 16px 0;
    text-align: center;
    .link {
      a { color: rgba(0,0,0,.45); }
      a:hover { color: #1890ff }
    }
  }
</style>
