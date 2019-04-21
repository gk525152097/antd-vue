<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'  // eslint-disable-line
import moment from 'moment' // eslint-disable-line
import 'moment/locale/zh-cn'
export default {
  name: 'App',
  data () {
    return {
      zh_CN
    }
  }
// todo 将全局提示作为方法进行调用 方便以后更换UI
// todo 请求拦截器的修改
}
</script>

<style lang="scss" scoped>
  #app{
    width: 100%;
    height: 100%;
  }
</style>
