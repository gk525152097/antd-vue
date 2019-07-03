<template>
    <div class="authorityManage">
      <a-row :gutter="12" style="display: flex; align-items: stretch">
        <a-col :xs="24" :sm="24" :md="6" :lg="5" :xl="4">
          角色list
        </a-col>
        <a-col :xs="24" :sm="24" :md="18" :lg="19" :xl="20">
          权限
          <div class="authority-item">
            <div class="item-title">
              <a-checkbox
                :indeterminate="indeterminate"
                :checked="checkAll"
                @change="onCheckAllChange"
              >
                全选
              </a-checkbox>
            </div>
            <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
          </div>
        </a-col>
      </a-row>
    </div>
</template>

<script>
const plainOptions = ['Apple', 'Pear', 'Orange']
const defaultCheckedList = ['Apple', 'Orange']
export default {
  name: 'index',
  data () {
    return {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions
    }
  },
  methods: {
    onChange (checkedList) {
      this.indeterminate = !!checkedList.length && (checkedList.length < plainOptions.length)
      this.checkAll = checkedList.length === plainOptions.length
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.authorityManage {
  .authority-item {
    padding: 12px;
    background: #fff;
    margin-bottom: 12px;
    .authority-title {
      border-bottom: 1px solid #E9E9E9;
    }
  }
}
</style>
