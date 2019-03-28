<template>
  <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
    <template v-for="item in routes">
      <a-menu-item v-if="!item.routes" :key="item.key">
        <a-icon type="pie-chart" />
        <span>{{item.name}}</span>
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
      list: [
        {
          key: '1',
          title: 'Option 1'
        },
        {
          key: '2',
          title: 'Navigation 2',
          children: [
            {
              key: '2.1',
              title: 'Navigation 3',
              children: [
                {
                  key: '2.1.1',
                  title: 'Option 2.1.1'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
