<template>
  <div class="table-box">
    <a-table :columns="columns" :dataSource="list" :pagination="false">
      <span slot="action" slot-scope="text, record">
        <a @click="showModal(text)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm okText="确定" cancelText="取消" @confirm="confirm(text)">
          <span slot="title">确定删除{{text.name}}?</span>
          <a>删除</a>
        </a-popconfirm>
      </span>
    </a-table>

    <a-modal
      title="编辑角色"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="角色名称"
        >
          <a-input
            placeholder="请输入！"
            v-decorator="[
              'role',
              { initialValue: fields.role },
              {rules: [{ initialValue: 3 }, { required: true, message: '请输入' }]}
            ]"
          />
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="角色代码"
        >
          <a-input
            placeholder="请输入！"
            v-decorator="[
              'roleCode',
              { initialValue: fields.roleCode },
              {rules: [{ required: true, message: '请输入' }]}
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
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
  data () {
    return {
      columns,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 }
      },
      // 不能这么写 因为vue生命周期里 子组件先创建 所以 这里list取不到值
      // list: this.$store.getters.rolemanage.list
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      fields: {
        role: '',
        roleCode: ''
      }
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
    },
    showModal (text) {
      this.fields = text
      this.visible = true
    },
    handleOk (e) {
      const _this = this
      e.preventDefault()

      this.confirmLoading = true

      this.form.validateFields((err, values) => {
        if (!err) {
          _this.$store.dispatch('updateRole', {...this.fields, ...values})
            .then(results => {
              console.log(results)
              if (results.code === 200) {
                message.success('修改成功！')
              }
              this.visible = false
              this.confirmLoading = false
              _this.$store.dispatch('getRole')
            })
            .catch(err => {
              console.log(err)
              this.confirmLoading = false
              this.form.resetFields()
            })
        }
      })
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
      this.form.resetFields()
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
