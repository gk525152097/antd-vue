<template>
  <div class="table-box">
    <a-spin :spinning="loading">
      <a-table :columns="columns" :dataSource="list">
        <a slot="name" slot-scope="text" href="#">{{text}}</a>
        <span slot="action" slot-scope="text, record">
        <a href="#">Invite 一 {{record.name}}</a>
        <a-divider type="vertical" />
        <a href="#">Delete</a>
        <a-divider type="vertical" />
        <a href="#" class="ant-dropdown-link">
          More actions <a-icon type="down" />
        </a>
    </span>
      </a-table>
    </a-spin>
  </div>
</template>

<script>
const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' }
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'tableBox',
  mounted () {
    this.handleUserList()
  },
  data: () => ({
    columns,
    list: [
      {key: 1, name: 'test', role: 'admin'}
    ]
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
