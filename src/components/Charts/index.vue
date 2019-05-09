<template>
  <i-echarts
    :option="option"
    ref="charts"
  />
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
import 'echarts-liquidfill'
import 'echarts-wordcloud'
export default {
  name: 'index',
  components: {
    'i-echarts': IEcharts
  },
  props: {
    option: {}
  },
  methods: {
    resize () {
      this.$refs.charts.resize()
    }
  },
  mounted () {
    const _this = this
    window.addEventListener('resize', () => _this.resize(), false)
    setTimeout(() => {
      _this.resize()
    }, 10)
  },
  beforeDestroy () {
    const _this = this
    window.removeEventListener('resize', () => _this.resize())
  }
}
</script>

<style lang="scss" scoped>

</style>
