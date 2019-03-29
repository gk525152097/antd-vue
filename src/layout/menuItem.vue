<template>
  <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
    <template v-for="item in routes">
      <a-menu-item v-if="!item.children" :key="item.key">
        <router-link :to="item.path">
          <a-icon type="pie-chart" />
          <span>{{item.name}}</span>
        </router-link>
      </a-menu-item>
      <sub-menu v-else :menu-info="item" :key="item.key"/>
    </template>
  </a-menu>
</template>

<script>
import SubMenu from './SubMenu.vue'
export default {
  name: 'menuItem',
  components: {
    'sub-menu': SubMenu
  },
  props: {
    routes: Array
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
