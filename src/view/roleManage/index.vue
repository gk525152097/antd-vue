<template>
  <div class="role-manage">
    <div class="action-box">
      <ActionBox/>
    </div>
    <div class="table-box">
      <TableBox :list="list" @handleSearch="handleSearch"/>
    </div>
  </div>
</template>

<script>
import ActionBox from './actionBox'
import TableBox from './tableBox'
export default {
  name: 'index',
  components: {
    TableBox,
    ActionBox
  },
  mounted () {
    this.handleSearch()
  },
  data () {
    return {
      // vuex中数据应该用computed来接 因为data只在created中触发一次
      // list: this.$store.getters.rolemanage.list
    }
  },
  computed: {
    list () {
      return this.$store.getters.rolemanage.list
    }
  },
  methods: {
    handleSearch (values) {
      this.$store.dispatch('getRole')
    }
  }
}
</script>

<style lang="scss" scoped>
.role-manage {
}
</style>
