<template>
    <div class="action-box">
      <a-button type="primary" @click="handleAddModal">新增用户</a-button>

      <a-modal
        :title="`新增用户:${userName}`"
        :visible="visible"
        @ok="handleAdd"
        @cancel="handleAddModal"
      >
        <a-spin :spinning="loading">
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
                {rules: [{ required: true, message: '请输入用户名！' }]}
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
              {rules: [{ required: true, message: '请选择角色！' }]}
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
export default {
  name: 'actionBox',
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      userName: ''
    }
  },
  computed: {
    roleList () {
      return this.$store.getters.usermanage.roleList
    },
    loading () {
      return this.$store.getters.usermanage.addLoading
    }
  },
  methods: {
    handleAddModal () {
      this.visible = !this.visible
    },
    handleAdd () {
      const _this = this
      console.log('add')
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          _this.$store.dispatch('usermanage/handleAddModalLoading')
          _this.$store.dispatch('usermanage/handleAdd', values)
            .then(res => {
              console.log(res)
              message.success('新增成功！')
              this.form.resetFields()
              this.handleAddModal()
              // 重新请求列表
              _this.$store.dispatch('usermanage/handleListLoading')
              _this.$store.dispatch('usermanage/handleUserList', {
                ..._this.$store.getters.usermanage.searchInfo,
                page: _this.$store.getters.usermanage.page,
                pageSize: _this.$store.getters.usermanage.pageSize
              })
                .then(res => { console.log(res) })
                .catch(err => { console.log(err) })
                .finally(() => { _this.$store.dispatch('usermanage/handleListLoading') })
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => {
              _this.$store.dispatch('usermanage/handleAddModalLoading')
            })
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.action-box {
  background: #fff;
  padding: 0 12px 12px;
}
</style>
