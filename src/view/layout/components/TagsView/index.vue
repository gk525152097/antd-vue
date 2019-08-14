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
          <span :class="{ active: activeKey === item.path }">
            <router-link :to="item.path">
              {{item.name}}
            </router-link>
          </span>
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import message from '../../../../utils/message'
export default {
  name: 'index',
  created () {
    this.$store.dispatch('addVisitedViews', this.$route)
  },
  data () {
    return {
      activeKey: this.$route.path
    }
  },
  computed: {
    tabMenuList () {
      return this.$store.getters.visitedviews
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
      // 获取当前路由
      let activeKey = this.activeKey
      // 获取最后一个标签
      let lastIndex
      // 判定标签个数 个数不能小于1
      if (this.tabMenuList.length === 1) {
        message({
          type: 'warn',
          message: '只有一个路由标签，不能删除！'
        })
      } else {
        // 循环便利查询出所关闭节点的位置
        this.tabMenuList.forEach((item, index) => {
          if (item.path === targetKey) {
            // 当关闭标签的位置为第一个时 将lastIndex置为0即获取新列表第一个标签
            // 位置不是第一个时 将前一个标签作为新页面
            if (index === 0) {
              lastIndex = 0
            } else {
              lastIndex = index - 1
            }
          }
        })
        // 删除节点
        this.$store.dispatch('delVisitedViews', {path: targetKey})
        // 将删除节点冲列表里筛选出来 并以lastIndex作为新页面获取页面路径
        const _tabMenuList = this.tabMenuList.filter(item => item.path !== targetKey)
        if (lastIndex >= 0 && activeKey === targetKey) {
          activeKey = _tabMenuList[lastIndex].path
        }
        // this.activeKey = activeKey
        // 跳转页面
        if (this.activeKey === targetKey) {
          this.$router.push({path: activeKey})
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  a {
    color: #1890ff
  }
}
</style>
