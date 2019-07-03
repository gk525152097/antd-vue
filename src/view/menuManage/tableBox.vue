<template>
  <a-spin :spinning="loading">
    <a-table :columns="columns" :dataSource="data.list">
      <template slot="pagination">
        <a-pagination
          showSizeChanger
          v-model="page"
          :pageSize.sync="pageSize"
          :total="data.total"
          @showSizeChange="onShowSizeChange"
          :showTotal="total => `共 ${total} 条`"
        />
      </template>
      <span slot="icon" slot-scope="text">
        <a-icon type="smile-o"/>
      </span>
        <span slot="action" slot-scope="text, record">
        <a-popconfirm okText="确定" cancelText="取消" @confirm="removeMenu(text)">
            <span slot="title">确定删除{{text.name}}?</span>
            <a>删除</a>
          </a-popconfirm>
      </span>
    </a-table>
  </a-spin>
</template>
<script>
import { message } from 'ant-design-vue'
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
      menuItem: {},
      data,
      columns,
      loading: false,
      page: 0,
      pageSize: 10
    }
  },
  mounted () {
    this.getMenuList()
  },
  methods: {
    getMenuList (id) {
      this.loading = true
      this.$store.dispatch('getMenuList', {
        id: id || 0,
        page: this.page,
        pageSize: this.pageSize
      })
        .then(() => {
          this.loading = false
        })
    },
    removeMenu (data) {
      this.loading = true
      this.$store.dispatch('removeMenu', data)
        .then(results => {
          console.log(results)
          message.success('删除成功！')
          this.$store.dispatch('getMenuList', {
            id: this.menuItem.id,
            page: this.page,
            pageSize: this.pageSize
          })
        })
        .catch(err => {
          console.log(err)
          message.error('删除失败！')
        })
        .finally(() => {
          this.loading = false
        })
    },
    onShowSizeChange (current, pageSize) {
      console.log(current, pageSize)
      this.loading = true
      this.$store.dispatch('getMenuList', {
        id: this.menuItem.id,
        page: this.page,
        pageSize: this.pageSize
      })
        .then(results => {
          console.log(results)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  computed: {
    list () {
      return this.$store.getters.menumanage.list
    },
    _menuItem () {
      return this.$store.getters.menumanage.info
    }
  },
  watch: {
    list () {
      this.data = this.list
    },
    _menuItem () {
      this.menuItem = this._menuItem
    }
  }
}
</script>
