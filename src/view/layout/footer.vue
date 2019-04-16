<template>
  <div class="footer">Antd-vue ©2019 - {{new Date().toLocaleString().slice(0, 4)}} Created by GK黎光</div>
</template>

<script>
export default {
  name: 'footer'
}
</script>

<style scoped>
.footer{
  font-size: 14px;
  color: rgba(0,0,0,.45);
  padding: 10px 0 16px 0;
  text-align: center;
}
</style>
