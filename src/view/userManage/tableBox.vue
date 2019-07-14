<template>
  <div class="table-box">
    <a-spin :spinning="loading">
      <a-table
        :columns="columns"
        :dataSource="list"
        :rowSelection="rowSelection"
      >
        <a slot="name" slot-scope="text">{{text}}</a>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEditModal(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm :title="`确认删除${record.userName}？`" @confirm="handleDelete(record)" okText="确定" cancelText="取消">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </a-spin>

    <a-modal
      :title="`编辑用户:${userItem.userName}`"
      :visible="visible"
      @ok="handleEdit"
      @cancel="handleEditModal"
    >
      <p>xxx</p>
    </a-modal>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
export default {
  name: 'tableBox',
  mounted () {
    this.handleUserList()
  },
  data: () => ({
    columns: [
      { title: '用户名', dataIndex: 'userName', key: 'userName', slots: { title: 'customTitle' } },
      { title: '角色', dataIndex: 'role', key: 'role' },
      { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } }
    ],
    rowSelection: {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows)
      }
    },
    visible: false,
    userItem: {}
  }),
  computed: {
    loading () { return this.$store.getters.usermanage.userListLoading },
    list () { return this.$store.getters.usermanage.list }
  },
  methods: {
    // 获取用户列表
    handleUserList () {
      this.$store.dispatch('handleListLoading')
      this.$store.dispatch('handleUserList')
        .then(res => { console.log(res) })
        .catch(err => { console.log(err) })
        .finally(() => { this.$store.dispatch('handleListLoading') })
    },
    // 新增
    // handleAdd () {}, // 新增在actionBox里
    // handleEditModal
    handleEditModal (record) {
      if (record) this.userItem = record
      else this.userItem = {}
      this.visible = !this.visible
    },
    // 修改
    handleEdit () {
      console.log(this.userItem)
    },
    // 删除
    handleDelete (record) {
      console.log(record)
      this.$store.dispatch('handleListLoading')
      this.$store.dispatch('handleDelete', record)
        .then(res => {
          console.log(res)
          message.success('删除成功')
          this.$store.dispatch('handleListLoading')
          this.handleUserList()
        })
        .catch(err => {
          console.log(err)
          this.$store.dispatch('handleListLoading')
        })
        // .finally(() => { // 因为删除成功后 需要重新请求列表 loading切换顺序讲改变
        //   this.$store.dispatch('handleListLoading')
        // })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-box {
  background: #fff;
}
</style>
