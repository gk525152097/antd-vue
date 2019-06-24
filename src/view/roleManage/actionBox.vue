<template>
  <div class="action-box">
    <a-button type="primary" @click="showModal">新增角色</a-button>
    <a-modal
      title="新增角色"
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
              {rules: [{ required: true, message: '请输入' }]}
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
export default {
  name: 'actionBox',
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 }
      }
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      const _this = this
      e.preventDefault()

      this.confirmLoading = true

      this.form.validateFields((err, values) => {
        if (!err) {
          _this.$store.dispatch('addRole', values)
            .then(results => {
              console.log(results)
              if (results.code === 200) {
                message.success('新增成功！')
              }
              this.visible = false
              this.confirmLoading = false
              _this.$store.dispatch('getRole')
            })
            .catch(err => {
              console.log(err)
              this.visible = false
              this.confirmLoading = false
            })
        }
      })
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.action-box {
  background: #fff;
  padding: 12px 12px;
}
</style>
