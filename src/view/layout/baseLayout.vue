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
      <a-layout-header class="header">
        <Header />
      </a-layout-header>
      <!-- TagsView -->
      <a-breadcrumb class="tags-view">
        <a-breadcrumb-item>User</a-breadcrumb-item>
        <a-breadcrumb-item>Bill</a-breadcrumb-item>
      </a-breadcrumb>
      <!-- 主体 -->
      <div class="content">
        <!-- 页面 -->
        <MainPage />
      </div>
      <a-layout-footer style="text-align: center">
        <Footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import MenuBar from './components/menuBar.vue'
import MainPage from './components/mainPage.vue'
import Footer from './footer'
import Header from './header'
export default {
  name: 'baseLayout',
  components: {
    MenuBar,
    MainPage,
    Footer,
    Header
  },
  data () {
    return {
      collapsed: false,
      routes: this.$router.options.routes
    }
  }
}
</script>

<style lang="scss" scoped>
  #components-layout-demo-side {
    .logo {
      height: 32px;
      background: rgba(255,255,255,.2);
      margin: 16px;
    }
    .header {
      background: #fff;
      padding: 0;
    }
    .content {
      padding: 0 24px;
    }
    .tags-view {
      margin: 16px 0;
    }
  }
</style>
