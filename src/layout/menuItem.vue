<template>
  <a-menu-item key="1">
    <a-icon type="pie-chart" />
    <span>Option 1</span>
  </a-menu-item>
</template>

<script>
import MenuItem from '../layout/menuItem.vue'
export default {
  name: 'menuItem',
  components: {
    MenuItem
  },
  props: {
    routers: Array
  }
}
</script>

<style scoped>

</style>
