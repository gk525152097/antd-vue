<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh; display: flex; height: 100%">
    <!-- 菜单栏 -->
    <a-layout-sider
      collapsible
      v-model="collapsed"
    >
      <div class="logo" />
      <!-- 菜单项 -->
      <MenuBar />
    </a-layout-sider>
    <!-- 主体 -->
    <a-layout>
      <!-- 头部 -->
      <a-layout-header style="background: #fff; padding: 0" />
      <!-- 主体 -->
      <a-layout-content style="margin: 0 16px">
        <!-- TagsView -->
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <!-- 页面 -->
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <slot></slot>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Antd-vue ©2019 - {{new Date().toLocaleString().slice(0, 4)}} Created by GK黎光
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import MenuBar from './components/menuBar.vue'
import MainPage from './components/mainPage.vue'
export default {
  name: 'baseLayout',
  components: {
    MenuBar,
    MainPage
  },
  data () {
    return {
      collapsed: false,
      routes: this.$router.options.routes
    }
  }
}
</script>

<style scoped>
  #components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255,255,255,.2);
    margin: 16px;
  }
</style>
