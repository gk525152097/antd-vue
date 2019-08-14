<template>
  <div>
    <AuthorityController id="2">
      <template slot="function">
        <a-button type="primary" @click="handleAddModal">新增功能点</a-button>
      </template>
    </AuthorityController>
    <a-modal
      :title="`新增功能点:${functionName}`"
      :visible="visible"
      @ok="handleAdd"
      @cancel="handleAddModal"
    >
      <a-spin :spinning="loading">
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
                {rules: [{ required: true, message: '请输入功能名称！' }]}
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
                {rules: [{ required: true, message: '请输入功能描述！' }]}
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
                {rules: [{ required: true, message: '请输入功能地址！' }]}
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
import { message } from 'ant-design-vue'
import { mapState } from 'vuex'
import AuthorityController from '@/components/AuthorityController'
export default {
  name: 'addModal',
  components: {
    AuthorityController
  },
  data () {
    return {
      visible: false,
      form: this.$form.createForm(this),
      functionName: '',
      loading: false
    }
  },
  computed: {
    ...mapState({
      page: state => state.functionpointmanage.page,
      pageSize: state => state.functionpointmanage.pageSize,
      searchInfo: state => state.functionpointmanage.searchInfo
    })
  },
  methods: {
    handleAddModal () {
      this.visible = !this.visible
    },
    handleAddLoading () {
      this.loading = !this.loading
    },
    handleAdd () {
      const _this = this
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          this.handleAddLoading()
          _this.$store.dispatch('functionpointmanage/handleAdd', values)
            .then(res => {
              console.log(res)
              message.success('新增成功！')
              this.form.resetFields()
              this.handleAddModal()
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
                })
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => {
              this.handleAddLoading()
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
