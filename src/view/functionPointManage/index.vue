<template>
  <div>
    <ActionBox />
    <TableBox />
  </div>
</template>

<script>
import TableBox from './tableBox'
import ActionBox from './actionBox'

export default {
  name: 'index',
  components: {
    TableBox,
    ActionBox
  }
}
</script>

<style lang="scss" scoped>

</style>
