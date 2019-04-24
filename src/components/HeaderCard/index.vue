<template>
  <div class="header-card-components">
    <h3>
      {{Title}}
      <span class="icon">
        <a-tooltip>
          <template slot='title'>
            使用说明
          </template>
          <a-icon type="question-circle" />
        </a-tooltip>
      </span>
    </h3>
    <h1>{{BodyData}}</h1>
    <div class="echarts">
      <slot name="echarts"></slot>
    </div>
    <div class="line" />
    <p>{{Footer}}</p>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    Title: '',
    BodyData: '',
    Footer: ''
  }
}
</script>

<style lang="scss" scoped>
.header-card-components {
  padding: 20px 24px 8px;
  background: #fff;
  h3 {
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
    .icon {
      float: right;
    }
  }
  h1 {
    height: 38px;
    margin: 4px 0 8px 0;
    overflow: hidden;
    color: rgba(0,0,0,.85);
    font-size: 30px;
    line-height: 38px;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  }
  .echarts {
    height: 50px;
  }
  .line {
    width: 100%;
    border-top: 1px solid #e8e8e8;
  }
  p {
    font-size: 14px;
    line-height: 22px;
    margin: 0;
    padding: 8px 0;
  }
}
</style>
