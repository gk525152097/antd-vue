<template>
    <a-row>
      <a-col :xs="24" :sm="24" :md="12" :lg="18" :xl="18">
        <i-echarts
          :option="option"
          :ref="id"
        />
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <ul>
          <li v-for="(item, index) in fakeDate" :key="index">
            <a-badge dot :numberStyle="`background: ${item.itemStyle.color}`" />
            {{item.name}}
            <Divider type="vertical" />
            {{`￥${item.value}`}}
          </li>
        </ul>
      </a-col>
    </a-row>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
const fakeDateList = []
const getColor = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  const rgb = '(' + r + ',' + g + ',' + b + ')'
  return rgb
}
for (let i = 0; i < 7; i += 1) {
  const color = getColor()
  fakeDateList.push(
    {value: 335,
      name: '直接访问',
      itemStyle: {
        color: `rgb${color}`
      }
    }
  )
}
export default {
  name: 'index',
  components: {
    'i-echarts': IEcharts
  },
  props: {
    id: ''
  },
  data () {
    return {
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: { // 此配置
              normal: {
                borderWidth: 4,
                borderColor: '#ffffff'
              }
            },
            data: fakeDateList
          }
        ]
      }
    }
  },
  computed: {
    fakeDate: function () {
      return fakeDateList
    }
  }
  // todo 首页饼图组件制作 有点点小难
}
</script>

<style lang="scss" scoped>

</style>
