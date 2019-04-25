<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh; display: flex; height: 100%">
    <!-- 菜单栏 -->
    <a-layout-sider
      collapsible
      v-model="collapsed"
    >
      <div class="logo" />
      <!-- 菜单项 -->
      <menu-bar />
    </a-layout-sider>
    <!-- 主体 -->
    <a-layout>
      <!-- 头部 -->
      <a-layout-header class="header">
        <global-header />
      </a-layout-header>
      <!-- TagsView -->
      <tags-view/>
      <!-- 主体 -->
      <div class="content">
        <!-- 页面 -->
        <main-page />
      </div>
      <a-layout-footer style="text-align: center">
        <global-footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import MenuBar from './components/menuBar.vue'
import MainPage from './components/mainPage.vue'
import Footer from './footer'
import Header from './header'
import TagsView from './components/TagsView'
export default {
  name: 'baseLayout',
  components: {
    MenuBar,
    MainPage,
    'global-footer': Footer,
    'global-header': Header,
    TagsView
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
