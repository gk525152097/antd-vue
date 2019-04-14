<template>
  <a-sub-menu
    :key="menuInfo.key"
    v-if="!menuInfo.hidden"
  >
    <span slot="title">
      <a-icon type="mail" /><span>{{ menuInfo.name }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.key"
      >
        <router-link :to="item.path">
          <a-icon type="pie-chart" />
          <span>{{ item.name }}</span>
        </router-link>
      </a-menu-item>
      <sub-menu
        v-else
        :key="item.key"
        :menu-info="item"
      />
    </template>
  </a-sub-menu>
</template>

<script>
export default {
  name: 'subMenu',
  props: {
    menuInfo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
