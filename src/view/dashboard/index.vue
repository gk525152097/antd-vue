<template>
  <div>
    <div class="statistics">
      <a-tabs defaultActiveKey="1">
        <template slot="tabBarExtraContent" >
          <div class="tabsOperation">
            <a href="#">今日</a>
            <a href="#">本周</a>
            <a href="#">本月</a>
            <a href="#">全年</a>
          </div>
          <a-range-picker showTime format="YYYY-MM-DD HH:mm:ss" />
        </template>
        <a-tab-pane tab="销售额" key="1">Content of Tab 1</a-tab-pane>
        <a-tab-pane tab="访问量" key="2">Content of Tab 2</a-tab-pane>
      </a-tabs>
    </div>
    <router-link to="analysis">analysis</router-link>
    <router-link to="dashboard">dashboard</router-link>
  </div>
</template>

<script type="text/jsx">
export default {
  name: 'index',
  methods: {},
  // todo 首页模块仿制
}
</script>

<style lang="scss" scoped>
.statistics {
  background: #fff;
  padding: 8px;
}
.tabsOperation{
  display: inline-block;
  a {
    padding: 0 12px 0 0;
  }
}
</style>
