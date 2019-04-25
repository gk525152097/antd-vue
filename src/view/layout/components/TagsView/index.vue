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
      let activeKey = this.activeKey
      let lastIndex
      if (this.tabMenuList.length === 1) {
        message({
          type: 'warn',
          message: '只有一个路由标签，不能删除！'
        })
      } else {
        this.tabMenuList.forEach((item, index) => {
          if (item.path === targetKey) {
            lastIndex = index - 1
          }
        })
        this.$store.dispatch('delVisitedViews', {path: targetKey})
        const _tabMenuList = this.tabMenuList.filter(item => item.path !== targetKey)
        if (lastIndex >= 0 && activeKey === targetKey) {
          activeKey = _tabMenuList[lastIndex].path
        }
        // this.activeKey = activeKey
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
