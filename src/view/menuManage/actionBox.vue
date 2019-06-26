<template>
  <div class="btn-area">
    <AddModal class="btn" />
    <EditModal class="btn" />
  </div>
</template>

<script>
import EditModal from './editModal'
import AddModal from './addModal'
export default {
  name: 'actionBox',
  components: {
    EditModal,
    AddModal
  }
}
</script>

<style lang="scss" scoped>
  .btn-area {
    margin-bottom: 12px;
    .btn {
      display: inline-block;
      margin: 0 6px;
    }
  }
</style>
