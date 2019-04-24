<template>
    <div>index</div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      tabMenuList: [
        { name: 'cehis1', path: '/dashboard' },
        { name: 'cehis1', path: '/dashboard' },
        { name: 'cehis1', path: '/dashboard' },
        { name: 'cehis1', path: '/dashboard' },
        { name: 'cehis1', path: '/dashboard' }
      ]
    }
  }
// todo 标签页的制作思路
// 1、ui设计 点击菜单没有的新增 点击时跳转并高亮其他转变为正常（待定） 关闭时跳转上一次页面（路由可作）
// 2、store设计 主要存储list add remove操作
// 3、add操作在 路由守卫制作 跳转时 判定是否存在 是不增加 否增加 默认添加一个
// 4、remove在这里做 点击时关闭 并跳转上一次页面 只剩一个时默认不予以关闭
}
</script>

<style lang="scss" scoped>

</style>
