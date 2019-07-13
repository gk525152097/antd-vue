<template>
    <div class="authority-tree">
      <div v-if="Object.keys(selectRole).length">
        <div class="title">菜单权限</div>
        <a-tree
          class="tree"
          checkable
          v-model="checkedKeys"
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          :treeData="treeData"
          @select="onSelect"
          @expand="onExpand"
        />
        <div class="btn">
          <a-popconfirm title="确认更改权限？" @confirm="confirm" okText="确定" cancelText="取消">
            <a-button type="primary">提交</a-button>
          </a-popconfirm>
        </div>
      </div>
      <div class="no-role" v-else>
        请选择权限
      </div>
    </div>
</template>

<script>
import { message } from 'ant-design-vue'
import transform from '@/utils/transformTree'
export default {
  name: 'authorityTree',
  mounted () {
    this.$store.dispatch('getMenuTree')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  destroy () {
    this.selectRole = {}
  },
  data: () => ({
    autoExpandParent: true,
    checkedKeys: [],
    expandedKeys: [1],
    selectRole: {}
  }),
  computed: {
    treeData () {
      return transform(this.$store.getters.authoritymanage.menuTree)
    },
    treeList () { // 待定 显示角色选中的 权限内容 以方便做提交确认
      return this.$store.getters.authoritymanage.menuTree
    },
    role () { // 获取选中角色
      return this.$store.getters.authoritymanage.role
    },
    menuAuthority () {
      return this.$store.getters.authoritymanage.role.menuAuthority
    }
  },
  watch: {
    checkedKeys (val) {
      console.log('onCheck', val)
    },
    menuAuthority () {
      if (this.menuAuthority) {
        this.checkedKeys = this.menuAuthority.split(',').map(item => this.item = Number(item))
      } else {
        this.checkedKeys = []
      }
    },
    role () {
      this.selectRole = this.role
    }
  },
  methods: {
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    confirm () {
      console.log(this.selectRole, this.checkedKeys)
      this.checkedKeys = this.checkedKeys.splice(this.checkedKeys.indexOf(1) + 1) // 把根目录去除 否则新增菜单时会被默认选择 则于实际数据不符合
      this.$store.dispatch('handleAuthority', {
        role: this.selectRole,
        authority: this.checkedKeys
      })
        .then(res => {
          console.log(res)
          message.success('修改成功！')
          this.$store.dispatch('getRoleList')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.authority-tree {
  background: #fff;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  .no-role{
    padding: 8px 16px;
  }
  .title {
    padding: 8px 16px;
    border-bottom: 1px solid #d9d9d9;
    box-sizing: border-box;
  }
  .tree {
    padding: 0 12px 12px;
  }
  .btn {
    padding: 8px 16px;
    border-top: 1px solid #d9d9d9;
    box-sizing: border-box;
  }
}
</style>
