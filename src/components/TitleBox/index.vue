<template>
    <div class="title-box">
      <div class="title-wrapper">
        <div class="title">{{title}}</div>
        <div class="action">
          <slot name="action"/>
        </div>
      </div>
      <div class="box-body">
        <slot name="body"/>
      </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    title: ''
  }
}
</script>

<style lang="scss" scoped>
.title-box {
  background: #fff;
  .title-wrapper {
    padding: 12px;
    border-bottom: 1px solid #e8e8e8;
    .title {
      display: inline-block;
    }
    .action {
      float: right;
    }
  }
  .box-body {
    padding: 12px;
  }
}

</style>
