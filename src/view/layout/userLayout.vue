<template>
  <div class="main">
    <div class="body">
      <h1>Ant Design Vue</h1>
      <p>基于vue的antd项目 by GK黎光</p>
      <router-view/>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from './footer.vue'
export default {
  name: 'userLayout',
  components: {
    Footer
  }
}
</script>

<style lang="scss"  scoped>
  @import "../../assets/styles/global.scss";
  .main{
    width: 100%;
    height: 100%;
    background: rgba(240, 242, 245, 1);
    .body{
      width: 40%;
      margin: 0 auto;
      padding: 30px 0 0 0;
      h1{
        margin: 40px 0 0 0;
        font-size: 33px;
        font-weight: 600;
        font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
        color: rgba(0, 0, 0, 0.85);
        text-align: center;
      }
      p{
        text-align: center;
        margin: 12px 0;
        color: rgba(0,0,0,.45);
        font-size: 14px;
      }
    }
    .footer{
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
</style>
