<template>
  <div>
    <a-tabs
      hideAdd
      type="editable-card"
      tabPosition="bottom"
      :tabBarStyle="{margin: '0 0 10px 0'}"
      :defaultActiveKey="this.$route.path"
      :activeKey="activeKey"
      @edit="onEdit"
    >
      <a-tab-pane v-for="(item) in tabMenuList" :key="item.path">
        <template slot="tab">
          <router-link :to="item.path">
            <span>{{item.name}}</span>
          </router-link>
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  name: 'index',
  created () {
    this.$store.dispatch('addVisitedViews', this.$route)
  },
  data () {
    return {
      tabMenuList: this.$store.getters.visitedviews,
      activeKey: this.$route.path
    }
  },
  watch: {
    $route () {
      this.activeKey = this.$route.path
    }
  },
  methods: {
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
    remove (targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.tabMenuList.forEach((item, index) => {
        if (item.path === targetKey) {
          lastIndex = index - 1
        }
      })
      const _tabMenuList = this.tabMenuList.filter(item => item.path !== targetKey)
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = _tabMenuList[lastIndex].path
      }
      this.panes = _tabMenuList
      this.activeKey = activeKey
    }
  }
// todo 标签页的制作思路
// 1、ui设计 点击菜单没有的新增 点击时跳转并高亮其他转变为正常（待定） 关闭时跳转上一次页面（路由可作）
// 2、store设计 主要存储list add remove操作
// 3、add操作在 路由守卫制作 跳转时 判定是否存在 是不增加 否增加 默认添加一个
// 4、remove在这里做 点击时关闭 并跳转上一次页面 只剩一个时默认不予以关闭
}
</script>

<style lang="scss" scoped>

</style>
