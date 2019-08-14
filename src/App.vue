<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </div>
  </a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'  // eslint-disable-line
import moment from 'moment' // eslint-disable-line
import 'moment/locale/zh-cn'
export default {
  name: 'App',
  data () {
    return {
      zh_CN
    }
  }
// todo 面包屑导航制作 (待定 因为标签页的存在导致 面包屑导航 实际作用削弱)
// todo 自动化部署 docker接入 (这部分涉及到服务器 和 docker文件配置)
// todo 动态路由 组件化 考虑到 简单路由 复杂路由 可以使用设计模式来实现本地复杂路由 （现在已实现复杂路由的设计与制作）
// todo mock的可配置性 或者 是两套 开发环境 一套是没有后台的使用mock的 一套是有后台的关闭mock的
// todo 权限模块 菜单模块权限完成 功能权限开发中
// todo 细分到功能的权限管理--》解决方案: 编写功能权限组件 传入code和authorityCode做判断 匹配则显示 code为单个功能的权限 authorityCode为用户的实际权限
}
</script>

<style lang="scss" scoped>
#app{
  width: 100%;
  height: 100%;
}
</style>
