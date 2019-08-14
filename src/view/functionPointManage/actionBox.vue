<template>
  <div class="searchBox">
    <a-form :form="form" @submit="handleSubmit">
      <a-row :gutter="12">
        <a-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6">
          <a-form-item label="功能ID" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input v-decorator="['id']"/>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6">
          <a-form-item label="功能名称" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input v-decorator="['functionName']"/>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6">
          <a-form-item label="功能地址" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input v-decorator="['functionUrl']"/>
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
    <div>
      <AddModal />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddModal from './addModal'
export default {
  name: 'actionBox',
  components: {
    AddModal
  },
  data () {
    return {
      form: this.$form.createForm(this)
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
    handleSubmit (e) {
      const _this = this
      e.preventDefault()
      this.form.validateFields(function (err, values) {
        if (!err) {
          console.log(values)
          _this.$store.dispatch('functionpointmanage/handleSearchInfo', values)
          _this.$store.dispatch('functionpointmanage/handleTableLoading')
          _this.$store.dispatch('functionpointmanage/handleTableList', {
            ...values,
            page: _this.page,
            pageSize: _this.pageSize
          })
            .then()
            .catch()
            .finally(() => {
              _this.$store.dispatch('functionpointmanage/handleTableLoading')
            })
        }
      })
    },
    handleReset () {
      console.log('重置')
      const _this = this
      this.form.resetFields()
      // 重置分页
      _this.$store.dispatch('functionpointmanage/handlePagination', {
        page: 0,
        pageSize: 20
      })
      // 重置查询条件
      _this.$store.dispatch('functionpointmanage/handleSearchInfo', {})
      _this.$store.dispatch('functionpointmanage/handleTableLoading')
      _this.$store.dispatch('functionpointmanage/handleTableList', {
        page: _this.page,
        pageSize: _this.pageSize
      })
        .then()
        .catch()
        .finally(() => {
          _this.$store.dispatch('functionpointmanage/handleTableLoading')
        })
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
