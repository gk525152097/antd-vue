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
      <a-spin :spinning="false">
        <a-form
          :form="form"
        >
          <a-form-item
            label="用户名"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'userName',
                {
                  initialValue: userItem.userName,
                  rules: [{ required: true, message: '请输入用户名！' }]
                }
              ]"
              placeholder="请输入用户名"
            />
          </a-form-item>
          <a-form-item
            label="角色"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-select
              v-decorator="[
                'role',
                {
                  initialValue: userItem.role,
                  rules: [{ required: true, message: '请选择角色！' }]
                 }
              ]"
              placeholder="请选择角色"
            >
              <a-select-option v-for="(item, index) in roleList" :key="index" :value="item.id">{{item.role}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import { mapState } from 'vuex'
export default {
  name: 'tableBox',
  mounted () {
    this.handleUserList()
  },
  data () {
    return {
      form: this.$form.createForm(this),
      columns: [
        { title: '用户名', dataIndex: 'userName', key: 'userName', slots: { title: 'customTitle' } },
        { title: '角色', dataIndex: 'roleName', key: 'roleName' },
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
      userItem: {},
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
      data: state => state.usermanage.list,
      loading: state => state.usermanage.userListLoading,
      page: state => state.usermanage.page,
      pageSize: state => state.usermanage.pageSize,
      roleList: state => state.usermanage.roleList
    })
  },
  methods: {
    // 获取用户列表
    handleUserList () {
      this.$store.dispatch('usermanage/handleListLoading')
      this.$store.dispatch('usermanage/handleUserList', {
        page: this.page,
        pageSize: this.pageSize
      })
        .then(res => { console.log(res) })
        .catch(err => { console.log(err) })
        .finally(() => { this.$store.dispatch('usermanage/handleListLoading') })
    },
    // handleEditModal
    handleEditModal (record) {
      if (record) this.userItem = record
      else this.userItem = {}
      this.visible = !this.visible
    },
    // 修改
    handleEdit () {
      const _this = this
      this.form.validateFields((err, values) => {
        if (!err) {
          _this.$store.dispatch('usermanage/handleEdit', {
            ...this.userItem,
            ...values
          })
            .then(res => {
              console.log(res)
              message.success('修改成功！')
              this.form.resetFields()
              _this.handleEditModal()
              _this.handleUserList()
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    // 删除
    handleDelete (record) {
      console.log(record)
      this.$store.dispatch('usermanage/handleListLoading')
      this.$store.dispatch('usermanage/handleDelete', record)
        .then(res => {
          console.log(res)
          message.success('删除成功')
          this.$store.dispatch('usermanage/handleUserList', {
            page: this.page,
            pageSize: this.pageSize
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.$store.dispatch('usermanage/handleListLoading')
        })
    },
    // 分页功能
    handlePage (current, pageSize) {
      console.log(current, pageSize)
      this.$store.dispatch('usermanage/handleListLoading')
      this.$store.dispatch('usermanage/handleUserList', {
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
          this.$store.dispatch('usermanage/handleListLoading')
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
  background: #fff;
}
</style>
