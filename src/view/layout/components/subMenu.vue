<template>
  <a-sub-menu
    :key="menuInfo.path"
    v-bind="$props"
    v-on="$listeners"
    v-if="!menuInfo.hidden"
  >
    <span slot="title">
      <a-icon :type="menuInfo.icon" v-if="menuInfo.icon"/><span>{{ menuInfo.name }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item
        v-if="!item.children && !item.hidden"
        :key="item.path"
      >
        <router-link :to="item.path">
          <a-icon :type="item.icon" v-if="item.icon" />
          <span>{{ item.name }}</span>
        </router-link>
      </a-menu-item>
      <sub-menu
        v-else
        :key="item.path"
        :menu-info="item"
      />
    </template>
  </a-sub-menu>
</template>
<script>
import { Menu } from 'ant-design-vue'
export default {
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
