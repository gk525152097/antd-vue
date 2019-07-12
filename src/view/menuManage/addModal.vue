<template>
  <div>
    <a-button type="primary" @click="showModal">新增菜单</a-button>
    <!-- 新增模态框 -->
    <a-modal
      title="新增菜单"
      :visible="visible"
      @cancel="handleCancel"
    >
      <template slot="footer">
        <a-button :disabled="disabled" @click="handleCancel">取消</a-button>
        <a-button type="primary" :loading="confirmLoading" @click="handleOk">确定</a-button>
      </template>
      <a-form :form="form">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="菜单图标"
        >
          <a-select
            style="width: 100%"
            placeholder="请选择！"
            v-decorator="[
              'icon',
            ]"
          >
            <a-select-option value="dashboard"><a-icon type="dashboard" /></a-select-option>
            <a-select-option value="plus-square"><a-icon type="plus-square" /></a-select-option>
            <a-select-option value="smile-o"><a-icon type="smile-o" /></a-select-option>
            <a-select-option value="area-chart"><a-icon type="area-chart" /></a-select-option>
            <a-select-option value="pie-chart"><a-icon type="pie-chart" /></a-select-option>
            <a-select-option value="bar-chart"><a-icon type="bar-chart" /></a-select-option>
            <a-select-option value="dot-chart"><a-icon type="dot-chart" /></a-select-option>
            <a-select-option value="line-chart"><a-icon type="line-chart" /></a-select-option>
            <a-select-option value="radar-chart"><a-icon type="radar-chart" /></a-select-option>
            <a-select-option value="heat-map"><a-icon type="heat-map" /></a-select-option>
            <a-select-option value="fall"><a-icon type="fall" /></a-select-option>
            <a-select-option value="rise"><a-icon type="rise" /></a-select-option>
            <a-select-option value="stock"><a-icon type="stock" /></a-select-option>
            <a-select-option value="box-plot"><a-icon type="box-plot" /></a-select-option>
            <a-select-option value="fund"><a-icon type="fund" /></a-select-option>
            <a-select-option value="sliders"><a-icon type="sliders" /></a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="菜单名称"
        >
          <a-input
            placeholder="请输入！"
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入' }]}
            ]"
          />
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="显示路径"
        >
          <a-input
            placeholder="请输入！"
            v-decorator="[
              'path',
              {rules: [{ required: true, message: '请输入' }]}
            ]"
          />
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="文件路径"
        >
          <a-input
            placeholder="请输入！"
            v-decorator="[
              'component',
              {rules: [{ required: true, message: '请输入' }]}
            ]"
          />
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="转发地址"
        >
          <a-input
            placeholder="请输入！"
            v-decorator="[
              'redirect',
            ]"
          />
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="是否隐藏"
        >
          <a-radio-group
            buttonStyle="solid"
            v-decorator="[
              'hidden',
              { initialValue: '0' }
            ]"
          >
            <a-radio-button value="0">否</a-radio-button>
            <a-radio-button value="1">是</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
export default {
  name: 'addModal',
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      disabled: false,
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
  computed: {
    data () {
      return this.$store.getters.menumanage.info
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
      this.disabled = true
      this.form.validateFields((err, values) => {
        if (!err) {
          values.hidden = parseInt(values.hidden)

          values.redirect === '' ? delete values.redirect : null

          _this.$store.dispatch('addMenu', {
            ...values,
            parentId: this.data.id
          })
            .then(results => {
              console.log(results)
              message.success('新增成功!')
              this.form.resetFields()
              this.$store.dispatch('getMenuList', {
                id: this.data.id,
                page: this.$store.getters.menumanage.page,
                pageSize: this.$store.getters.menumanage.pageSize
              })
              this.$store.dispatch('handleTreeLoading')
              this.$store.dispatch('getMenuTree')
                .then().catch()
                .finally(() => {
                  this.$store.dispathc('handleTreeLoading')
                })
            })
            .catch(err => {
              console.log(err)
              message.error('新增失败!')
            })
            .finally(() => {
              this.visible = false
              this.confirmLoading = false
              this.disabled = false
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

</style>
