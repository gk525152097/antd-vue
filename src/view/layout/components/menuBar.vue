<template>
  <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
    <template v-for="item in routes">
      <a-menu-item v-if="!item.children && !item.hidden" :key="item.key">
        <router-link :to="item.path">
          <a-icon type="pie-chart" />
          <span>{{item.name}}</span>
        </router-link>
      </a-menu-item>
      <sub-menu v-else-if="!item.hidden" :menu-info="item" :key="item.key"/>
      <sub-menu v-else :menu-info="item" :key="item.key"/>
    </template>
  </a-menu>
</template>

<script>
import SubMenu from './SubMenu.vue'
export default {
  name: 'menuBar',
  components: {
    'sub-menu': SubMenu
  },
  computed: {
    routes () {
      return this.$router.options.routers
    }
  }
}
</script>

<style scoped>

</style>
