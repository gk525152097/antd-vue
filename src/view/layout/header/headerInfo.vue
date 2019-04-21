<template>
  <a-popover trigger="click" placement="bottomLeft">
    <template slot="content" class="popover-contant">
      <a-tabs defaultActiveKey="1" :tabBarStyle="{'text-align': 'center'}" style="width: 320px">
        <a-tab-pane v-bind:tab="'通知 (' + inform + ')'" key="1">Content of Tab Pane 1</a-tab-pane>
        <a-tab-pane v-bind:tab="'消息 (' + information + ')'" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane v-bind:tab="'待办 (' + backlog + ')'" key="3">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
    </template>
    <a-badge :count="2"><a-icon type="bell" /></a-badge>
  </a-popover>
</template>

<script>
export default {
  name: 'headerInfo',
  data () {
    return {
      inform: 1,
      information: 2,
      backlog: 3
    }
  }
  // todo 消息模块仿制
}
</script>

<style lang="scss" scoped>
  .popover-contant {
    margin-top: 14px;
  }
</style>
