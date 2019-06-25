<template>
  <a-table :columns="columns" :dataSource="data" :pagination="false">
    <span slot="icon" slot-scope="text">
      <a-icon type="smile-o"/>
    </span>
    <span slot="action" slot-scope="text, record">
      <a-popconfirm okText="确定" cancelText="取消" @confirm="confirm(text)">
          <span slot="title">确定删除{{text.name}}?</span>
          <a>删除</a>
        </a-popconfirm>
    </span>
  </a-table>
</template>
<script>
const columns = [
  {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
    scopedSlots: { customRender: 'icon' }
  }, {
    title: 'name',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: 'path',
    dataIndex: 'path',
    key: 'path'
  }, {
    title: 'component',
    key: 'component',
    dataIndex: 'component'
  }, {
    title: 'redirect',
    key: 'redirect',
    dataIndex: 'redirect'
  }, {
    title: 'hidden',
    key: 'hidden',
    dataIndex: 'hidden'
  }, {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer']
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser']
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher']
}]

export default {
  name: 'tableBox',
  data () {
    return {
      data,
      columns
    }
  }
}
</script>
