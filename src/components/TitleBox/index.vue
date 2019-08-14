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
  height: 100%;
  display: flex;
  flex-direction: column;
  .title-wrapper {
    padding: 12px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 24px;
  }
  .box-body {
    flex: 1;
    padding: 12px;
  }
}

</style>
