<template>
    <div class="searchBox">
      <a-form :form="form" @submit="handleSubmit">
        <a-row :gutter="12">
          <a-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6">
            <a-form-item label="用户名" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-input v-decorator="['userName']"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6">
            <a-form-item label="角色" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-input v-decorator="['role']"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6">
            <a-form-item>
              <div class="btn-area">
                <a-button class="btn" type="primary" html-type="submit">查询</a-button>
                <a-button class="btn" @click="handleReset">重置</a-button>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
</template>

<script>
export default {
  name: 'searchBox',
  data: () => ({
    form: this.$form.createForm(this)
  }),
  methods: {
    handleSubmit (e) {
      const _this = this
      e.preventDefault()
      this.form.validateFields(function (err, values) {
        if (!err) {
          console.log('child:', values)
        }
      })
    },
    handleReset () {
      console.log('重置')
      this.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.searchBox {
  background: #fff;
  padding: 12px;
  .btn-area {
    text-align: center;
    .btn {
      margin: 0 6px;
    }
  }
}
</style>
