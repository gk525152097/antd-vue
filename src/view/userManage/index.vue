<template>
  <div class="user-manage">
    <div class="search-box">
      <SearchBox />
    </div>
    <div class="action-box">
      <ActionBox />
    </div>
   <div class="table-box">
     <TableBox />
   </div>
  </div>
</template>

<script>
import SearchBox from './searchBox'
import ActionBox from './actionBox'
import TableBox from './tableBox'

export default {
  name: 'index',
  components: {
    SearchBox,
    TableBox,
    ActionBox
  },
  data: () => ({}),
  methods: {}
}
</script>

<style lang="scss" scoped>
.user-manage {
  .search-box {}
  .action-box {
    margin: 0 0 12px;
  }
  .table-box {}
}
</style>
