<template>
  <a-spin :spinning="loading">
    <a-table :columns="columns" :dataSource="data.list">
      <template slot="pagination">
        <a-pagination
          showSizeChanger
          v-model="page"
          :pageSize.sync="pageSize"
          :total="data.total"
          @showSizeChange="handlePage"
          :showTotal="total => `共 ${total} 条`"
        />
      </template>
      <span slot="icon" slot-scope="text">
        <a-icon :type="text"/>
      </span>
      <span slot="hidden" slot-scope="text">
        {{{0:'否', 1: '是'}[text]}}
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
    title: 'icon',
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
    dataIndex: 'hidden',
    scopedSlots: { customRender: 'hidden' }
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
      page: 0,
      pageSize: 10
    }
  },
  mounted () {
    this.getMenuList()
  },
  methods: {
    // 获取树
    getMenuList (id) {
      this.$store.dispatch('handleTableLoading')
      this.$store.dispatch('getMenuList', {
        id: id || 1,
        page: this.page,
        pageSize: this.pageSize
      })
        .then(() => {
          this.$store.dispatch('handleTableLoading')
        })
    },
    // 删除菜单
    removeMenu (data) {
      this.$store.dispatch('handleTableLoading')
      this.$store.dispatch('removeMenu', data)
        .then(results => {
          console.log(results)
          message.success('删除成功！')
          this.$store.dispatch('getMenuList', {
            id: this.menuItem.id,
            page: this.page,
            pageSize: this.pageSize
          })
          this.$store.dispatch('handleTreeLoading')
          this.$store.dispatch('getMenuTree')
            .then()
            .catch()
            .finally(() => {
              this.$store.dispatch('handleTreeLoading')
            })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.$store.dispatch('handleTableLoading')
        })
    },
    // 分页功能
    handlePage (current, pageSize) {
      console.log(current, pageSize)
      this.$store.dispatch('handleTableLoading')
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
          this.$store.dispatch('handleTableLoading')
        })
    }
  },
  computed: {
    list () {
      return this.$store.getters.menumanage.list
    },
    _menuItem () {
      return this.$store.getters.menumanage.info
    },
    loading () {
      return this.$store.getters.menumanage.tableLoading
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
