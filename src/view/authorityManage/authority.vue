<template>
    <div class="authority-tree">
      <div v-if="Object.keys(selectRole).length">
        <div class="authority-box">
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
        </div>
        <div class="authority-box">
          <div class="title">功能权限</div>
          <div class="fun-authority">
            <div class="select-all-box">
              <a-checkbox
                @change="onCheckAllChange"
                :indeterminate="indeterminate"
                :checked="checkAll"
              >
                全选
              </a-checkbox>
            </div>
            <br />
            <a-checkbox-group style="width: 100%" v-model="checkedList" @change="onChange">
              <a-row>
                <a-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4" v-for="(item, index) in plainOptions" :key="index">
                  <a-checkbox :value="item.value">{{item.name}}</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </div>
        </div>
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
import { mapState } from 'vuex'
import { message } from 'ant-design-vue'
import transform from '@/utils/transformTree'
export default {
  name: 'authority',
  mounted () {
    this.$store.dispatch('authoritymanage/getMenuTree')
    this.$store.dispatch('authoritymanage/handleFunctionPoint')
    if (this.menuAuthority) {
      this.checkedKeys = this.menuAuthority.split(',').map(item => Number(item))
    }
    if (this.functionAuthority) {
      this.checkedList = this.functionAuthority.split(',').map(item => Number(item))
      this.onChange(this.checkedList)
    }
  },
  destroy () {
    this.selectRole = {}
  },
  data: () => ({
    autoExpandParent: true,
    checkedKeys: [],
    expandedKeys: [1],
    selectRole: {},
    indeterminate: false,
    checkAll: false,
    checkedList: [],
    plainOptions: [
      // {value: 1, name: '功能1'},
    ]
  }),
  computed: {
    ...mapState({
      treeData: state => transform(state.authoritymanage.menuTree),
      treeList: state => state.authoritymanage.menuTree,
      functionList: state => state.authoritymanage.functionPoint,
      role: state => state.authoritymanage.role,
      menuAuthority: state => state.authoritymanage.role.menuAuthority,
      functionAuthority: state => state.authoritymanage.role.functionAuthority
    })
  },
  watch: {
    checkedKeys (val) {
      console.log('onCheck', val)
    },
    menuAuthority () {
      if (this.menuAuthority) {
        this.checkedKeys = this.menuAuthority.split(',').map(item => Number(item))
      } else {
        this.checkedKeys = []
      }
    },
    functionAuthority () {
      if (this.functionAuthority) {
        this.checkedList = this.functionAuthority.split(',').map(item => Number(item))
      } else {
        this.checkedList = []
      }
      this.onChange(this.checkedList)
    },
    role () {
      this.selectRole = this.role
    },
    functionList () {
      this.plainOptions = this.functionList.map(function (item) {
        return {
          value: item.id,
          name: item.functionName
        }
      })
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
    // 功能权限单选
    onChange (checkedList) {
      this.indeterminate = !!checkedList.length && (checkedList.length < this.plainOptions.length)
      this.checkAll = checkedList.length > this.plainOptions.length
    },
    // 功能权限 全选
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.plainOptions.map(item => item.value) : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    },
    // 提交权限
    confirm () {
      console.log(this.selectRole, this.checkedKeys, this.checkedList)
      this.checkedKeys = this.checkedKeys.splice(this.checkedKeys.indexOf(1) + 1) // 把根目录去除 否则新增菜单时会被默认选择 则于实际数据不符合
      this.$store.dispatch('authoritymanage/handleAuthority', {
        role: this.selectRole,
        menuAuthority: this.checkedKeys,
        functionAuthority: this.checkedList
      })
        .then(res => {
          console.log(res)
          message.success('修改成功！')
          this.$store.dispatch('authoritymanage/getRoleList')
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
  .no-role{
    background: #fff;
    padding: 8px 16px;
    border: 1px solid #d9d9d9;
  }
  .authority-box {
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    background: #fff;
    margin-bottom: 10px;
  }
  .title {
    padding: 8px 16px;
    border-bottom: 1px solid #d9d9d9;
    box-sizing: border-box;
  }
  .tree {
    padding: 0 12px 12px;
  }
  .fun-authority {
    padding: 12px;
    .select-all-box {
      border-bottom: 1px solid #d9d9d9;
    }
  }
  .btn {
    background: #fff;
    padding: 8px 16px;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
  }
}
</style>
