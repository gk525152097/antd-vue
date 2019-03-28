<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh; display: flex; height: 100%">
    <!-- 菜单栏 -->
    <a-layout-sider
      collapsible
      v-model="collapsed"
    >
      <div class="logo" />
      <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>User</span></span>
          <a-menu-item key="1">Tom</a-menu-item>
          <a-menu-item key="2">Bill</a-menu-item>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="user" /><span>User</span></span>
            <a-menu-item key="3">Tom</a-menu-item>
            <a-sub-menu key="sub3">
              <span slot="title"><a-icon type="user" /><span>User</span></span>
              <a-menu-item key="4">Tom</a-menu-item>
              <a-menu-item key="5">Bill</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
        </a-sub-menu>
        <a-menu-item key="0">
          <a-icon type="pie-chart" />
          <span>Option 1</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- 主体 -->
    <a-layout>
      <!-- 头部 -->
      <a-layout-header style="background: #fff; padding: 0" />
      <!-- 主体 -->
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
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
// import MenuItem from '../layout/menuItem.vue'
export default {
  name: 'baseLayout',
  components: {
    // MenuItem
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
