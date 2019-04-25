<template>
  <a-menu
    theme="dark"
    :defaultSelectedKeys="['dashboard']"
    :defaultOpenKeys="['/']"
    :selectedKeys="[selectedKeys]"
    mode="inline"
  >
    <template v-for="item in routes">
      <a-menu-item v-if="!item.children && !item.hidden" :key="item.path">
        <router-link :to="item.path">
          <a-icon :type="item.icon" v-if="item.icon"/>
          <span>{{item.name}}</span>
        </router-link>
      </a-menu-item>
      <sub-menu v-else :menu-info="item" :key="item.path"/>
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
  data () {
    return {
      selectedKeys: this.$route.path.split('/')[1]
    }
  },
  watch: {
    $route () {
      this.selectedKeys = this.$route.path.split('/')[1]
    }
  },
  computed: {
    routes () {
      return this.$store.getters.routes
    }
  }
}
</script>

<style scoped>

</style>
