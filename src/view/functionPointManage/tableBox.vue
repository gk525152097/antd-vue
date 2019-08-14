<template>
  <div class="table-box">
    <a-spin :spinning="loading">
      <a-table
        :columns="columns"
        :dataSource="data.list"
        :rowSelection="rowSelection"
        rowKey="id"
        :pagination="pagination"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEditModal(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm :title="`确认删除${record.functionName}？`" @confirm="handleDelete(record)" okText="确定" cancelText="取消">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </a-spin>

    <a-modal
      :title="`修改功能点:${functionItem.functionName}`"
      :visible="visible"
      @ok="handleEdit"
      @cancel="handleEditModal"
    >
      <a-spin :spinning="editLoading">
        <a-form
          :form="form"
        >
          <a-form-item
            label="功能名称"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'functionName',
                {
                  initialValue: functionItem.functionName,
                  rules: [{ required: true, message: '请输入功能名称！' }]
                }
              ]"
              placeholder="请输入功能名称"
            />
          </a-form-item>
          <a-form-item
            label="功能描述"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'functionDescribe',
                {
                  initialValue: functionItem.functionDescribe,
                  rules: [{ required: true, message: '请输入功能描述！' }]
                }
              ]"
              placeholder="请输入功能描述"
            />
          </a-form-item>
          <a-form-item
            label="功能地址"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'functionUrl',
                {
                  initialValue: functionItem.functionUrl,
                  rules: [{ required: true, message: '请输入功能地址！' }]
                 }
              ]"
              placeholder="请输入功能地址"
            />
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { message } from 'ant-design-vue'
export default {
  name: 'tableBox',
  mounted () {
    this.handleTableList()
  },
  data () {
    return {
      form: this.$form.createForm(this),
      columns: [
        { title: '功能ID', dataIndex: 'id', key: 'id' },
        { title: '功能名称', dataIndex: 'functionName', key: 'functionName' },
        { title: '功能描述', dataIndex: 'functionDescribe', key: 'functionDescribe' },
        { title: '功能地址', dataIndex: 'functionUrl', key: 'functionUrl' },
        { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } }
      ],
      visible: false,
      editLoading: false,
      functionItem: {
        functionName: ''
      },
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
      pagination: {
        pageNo: 1,
        pageSize: 20, // 默认每页显示数量
        size: 'small',
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ['10', '20', '50', '100'], // 每页数量选项
        showTotal: total => `总共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          console.log(current, pageSize)
        }, // 改变每页数量时更新显示
        onChange: (page, pageSize) => {
          console.log(page, pageSize)
        }, // 点击页码事件
        total: 0 // 总条数
      }
    }
  },
  computed: {
    ...mapState({
      data: state => state.functionpointmanage.tableList,
      loading: state => state.functionpointmanage.tableLoading,
      page: state => state.functionpointmanage.page,
      pageSize: state => state.functionpointmanage.pageSize,
      searchInfo: state => state.functionpointmanage.searchInfo
    })
  },
  methods: {
    handleEditLoading () {
      this.editLoading = !this.editLoading
    },
    handleTableList () {
      this.$store.dispatch('functionpointmanage/handleTableLoading')
      this.$store.dispatch('functionpointmanage/handleTableList', {
        page: this.page,
        pageSize: this.pageSize
      })
        .then()
        .catch()
        .finally(() => {
          this.$store.dispatch('functionpointmanage/handleTableLoading')
        })
    },
    handleEditModal (record) {
      if (record) this.functionItem = record
      else this.functionItem = {}
      this.visible = !this.visible
    },
    handleEdit () {
      const _this = this
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          _this.handleEditLoading()
          _this.$store.dispatch('functionpointmanage/handleEdit', {
            ...this.functionItem,
            ...values
          })
            .then(res => {
              console.log(res)
              message.success('修改成功！')
              _this.$store.dispatch('functionpointmanage/handleTableLoading')
              _this.$store.dispatch('functionpointmanage/handleTableList', {
                page: _this.page,
                pageSize: _this.pageSize,
                ..._this.searchInfo
              })
                .then()
                .catch()
                .finally(() => {
                  _this.$store.dispatch('functionpointmanage/handleTableLoading')
                  _this.handleEditModal()
                })
            })
            .catch()
            .finally(() => {
              _this.handleEditLoading()
            })
        }
      })
    },
    handleDelete (record) {
      console.log(record)
      this.$store.dispatch('functionpointmanage/handleTableLoading')
      this.$store.dispatch('functionpointmanage/handleDelete', { id: record.id })
        .then(res => {
          console.log(res)
          message.success('删除成功！')
          this.$store.dispatch('functionpointmanage/handleTableList', {
            page: this.page,
            pageSize: this.pageSize,
            ...this.searchInfo
          })
        })
        .then(res => {
          console.log(res)
        })
        .catch()
        .finally(() => {
          this.$store.dispatch('functionpointmanage/handleTableLoading')
        })
    },
    handlePage (current, pageSize) {
      console.log(current, pageSize)
      this.$store.dispatch('functionpointmanage/handlePagination', {
        page: current,
        pageSize: pageSize
      })

      this.$store.dispatch('functionpointmanage/handleTableLoading')
      this.$store.dispatch('functionpointmanage/handleTableList', {
        page: current,
        pageSize: pageSize
      })
        .then()
        .catch()
        .finally(() => {
          this.$store.dispatch('functionpointmanage/handleTableLoading')
        })
    }
  },
  watch: {
    data () {
      this.pagination.total = this.data.total
    }
  }
}
</script>

<style lang="scss" scoped>
.table-box {
  margin-top: 12px;
  background: #fff;
}
</style>
