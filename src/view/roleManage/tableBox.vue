<template>
  <div class="table-box">
    <a-table :columns="columns" :dataSource="list">
      <span slot="action" slot-scope="text, record">
        <a href="#">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm okText="确定" cancelText="取消" @confirm="confirm(text)">
          <span slot="title">确定删除{{text.name}}?</span>
          <a href="#">删除</a>
        </a-popconfirm>
    </span>
    </a-table>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
const columns = [
  {
    title: '角色名称',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: '角色代码',
    dataIndex: 'roleCode',
    key: 'roleCode'
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'tableBox',
  props: {
    list: {
      required: true,
      type: Array
    }
  },
  mounted () {
    console.log('child-mounted')
  },
  data () {
    return {
      columns
      // 不能这么写 因为vue生命周期里 子组件先创建 所以 这里list取不到值
      // list: this.$store.getters.rolemanage.list
    }
  },
  methods: {
    confirm (text) {
      console.log(text)
      const _this = this
      this.$store.dispatch('removeRole', text)
        .then(results => {
          console.log(results)
          if (results.code === 200) {
            message.success(results.message)
          }
          // 去父组件发起查询请求
          // _this.$emit('handleSearch')
          // 不需要 因为没有查询条件 所有可以直接在vuex操作
          _this.$store.dispatch('getRole')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-box {
  background: #fff;
  padding: 0 12px;
}
</style>
