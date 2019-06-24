<template>
  <div class="table-box">
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
  props: [
    'list'
  ],
  data () {
    return {
      columns
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
