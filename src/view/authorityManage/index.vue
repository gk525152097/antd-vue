<template>
    <div class="authorityManage">
      <a-row :gutter="12">
        <a-col :xs="24" :sm="24" :md="6" :lg="5" :xl="4">
          <RoleList />
        </a-col>
        <a-col :xs="24" :sm="24" :md="18" :lg="19" :xl="20">
          <Authority />
        </a-col>
      </a-row>
    </div>
</template>

<script>
import RoleList from './roleList'
import Authority from './authority'
export default {
  name: 'index',
  components: {
    RoleList,
    Authority
  },
  data: () => ({}),
  methods: {}
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
