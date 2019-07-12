<template>
    <div class="authority-tree">
      <div class="title">菜单权限</div>
      <a-tree
        class="tree"
        checkable
        v-model="checkedKeys"
        :autoExpandParent="autoExpandParent"
        :treeData="_treeData"
        @select="onSelect"
      />
    </div>
</template>

<script>
import transform from '@/utils/transformTree'
export default {
  name: 'authorityTree',
  mounted () {
    this.$store.dispatch('getMenuTree')
      .then(res => {
        console.log(res)
        this.checkedKeys = [14] // 需要先请求到树 才能动态 选中节点
      })
      .catch(err => {
        console.log(err)
      })
  },
  data: () => ({
    autoExpandParent: true,
    checkedKeys: []
  }),
  computed: {
    _treeData () {
      return transform(this.$store.getters.authoritymanage.menuTree)
    }
  },
  watch: {
    checkedKeys (val) {
      console.log('onCheck', val)
    }
  },
  methods: {
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
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
