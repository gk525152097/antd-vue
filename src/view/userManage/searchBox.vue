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
              <a-select
                style="width: 100%"
                v-decorator="['role']"
              >
                <a-select-option v-for="(item,index) in roleList" :key="index" :value="item.id">{{item.role}}</a-select-option>
              </a-select>
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
import { mapState } from 'vuex'
export default {
  name: 'searchBox',
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  computed: {
    ...mapState({
      roleList: state => state.usermanage.roleList,
      searchInfo: state => state.usermanage.searchInfo,
      page: state => state.usermanage.page,
      pageSize: state => state.usermanage.pageSize
    })
  },
  methods: {
    handleSubmit (e) {
      const _this = this
      e.preventDefault()
      this.form.validateFields(function (err, values) {
        if (!err) {
          _this.$store.dispatch('usermanage/handleSearchInfo', values)
            .then(res => {
              console.log(res)
              _this.$store.dispatch('usermanage/handleListLoading')
              _this.$store.dispatch('usermanage/handleUserList', {
                ..._this.$store.getters.usermanage.searchInfo,
                page: _this.$store.getters.usermanage.page,
                pageSize: _this.$store.getters.usermanage.pageSize
              })
                .then().catch()
                .finally(() => {
                  _this.$store.dispatch('usermanage/handleListLoading')
                })
            })
        }
      })
    },
    handleReset () {
      console.log('重置')
      const _this = this
      this.form.resetFields()
      _this.$store.dispatch('usermanage/handlePagination', {
        page: 0,
        pageSize: 10
      })
      _this.$store.dispatch('usermanage/handleSearchInfo', {})
        .then(res => {
          console.log(res)
          _this.$store.dispatch('usermanage/handleListLoading')
          _this.$store.dispatch('usermanage/handleUserList', {
            page: this.$store.getters.usermanage.page,
            pageSize: this.$store.getters.usermanage.pageSize
          })
            .then().catch()
            .finally(() => {
              _this.$store.dispatch('usermanage/handleListLoading')
            })
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
