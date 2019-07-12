<template>
    <div class="authority-tree">
      <div class="title">菜单权限</div>
      <a-tree
        class="tree"
        checkable
        @expand="onExpand"
        :expandedKeys="expandedKeys"
        :autoExpandParent="autoExpandParent"
        v-model="checkedKeys"
        @select="onSelect"
        :selectedKeys="selectedKeys"
        :treeData="treeData"
      />
    </div>
</template>

<script>
const treeData = [{
  title: '0-0',
  key: '0-0',
  children: [{
    title: '0-0-0',
    key: '0-0-0',
    children: [
      { title: '0-0-0-0', key: '0-0-0-0' },
      { title: '0-0-0-1', key: '0-0-0-1' },
      { title: '0-0-0-2', key: '0-0-0-2' }
    ]
  }, {
    title: '0-0-1',
    key: '0-0-1',
    children: [
      { title: '0-0-1-0', key: '0-0-1-0' },
      { title: '0-0-1-1', key: '0-0-1-1' },
      { title: '0-0-1-2', key: '0-0-1-2' }
    ]
  }, {
    title: '0-0-2',
    key: '0-0-2'
  }]
}, {
  title: '0-1',
  key: '0-1',
  children: [
    { title: '0-1-0-0', key: '0-1-0-0' },
    { title: '0-1-0-1', key: '0-1-0-1' },
    { title: '0-1-0-2', key: '0-1-0-2' }
  ]
}, {
  title: '0-2',
  key: '0-2'
}]

export default {
  name: 'authorityTree',
  data: () => ({
    expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    checkedKeys: ['0-0-0'],
    selectedKeys: [],
    treeData
  }),
  watch: {
    checkedKeys (val) {
      console.log('onCheck', val)
    }
  },
  methods: {
    onExpand (expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    }
  }
}
</script>

<style lang="scss" scoped>
.authority-tree {
  background: #fff;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  .title {
    padding: 8px 16px;
    border-bottom: 1px solid #d9d9d9;
  }
  .tree {
    padding: 0 12px 12px;
  }
}
</style>
