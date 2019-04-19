<template>
  <!--<section class="app-main">-->
    <!--<transition name="fade-transform" mode="out-in">-->
      <!--<router-view/>-->
    <!--</transition>-->
  <!--</section>-->
  <transition name="fade-transform" mode="out-in">
    <router-view/>
  </transition>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>

<style scoped>
  .app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px - 34px);
    position: relative;
    overflow: hidden;
  }
</style>
