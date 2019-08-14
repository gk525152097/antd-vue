<template>
  <div v-if="authority">
    <slot name="function"/>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    id: {
      required: true
    }
  },
  computed: {
    authority () {
      return !(localStorage.getItem('authority').indexOf(parseInt(this.id)) === -1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
