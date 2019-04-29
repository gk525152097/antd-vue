<template>
  <a-row type="flex" style="height: 100%;">
    <a-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
      <charts :option="option"/>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
      <div class="list-box">
        <ul>
          <li v-for="(item, index) in fakeDate" :key="index" @click="(e) => handleVisible(e, index)">
            <span class="dot" :style="{'background': item.itemStyle.color}" v-show="item.visible"/>
            {{item.name}}
            {{`￥${item.value}`}}
          </li>
        </ul>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import Charts from '@/components/Charts'
const fakeDateList = []
const getColor = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  const rgb = '(' + r + ',' + g + ',' + b + ')'
  return rgb
}
for (let i = 0; i < 7; i += 1) {
  const color = getColor()
  fakeDateList.push(
    {
      value: 335,
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
    'charts': Charts
  },
  props: {
    id: ''
  },
  data () {
    return {
      chartsDate: fakeDateList,
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'],
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
  methods: {
    handleVisible (e, index) {
      console.log(e, index)
      this.fakeDate[index].visible = !this.fakeDate[index].visible
      this.chartsDate = this.fakeDate.filter(item => item.visible)
    }
  },
  computed: {
    fakeDate: function () {
      const _fackDate = fakeDateList.filter(item => item.visible = true)
      return _fackDate
    }
  },
  watch: {
    chartsDate: function () {
      this.option.series[0].data = this.chartsDate
    }
  }
  // todo 首页饼图组件制作 有点点小难
}
</script>

<style lang="scss" scoped>
.list-box {
  display: flex;
  align-items: center;
  height: 100%;
  .dot {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: #555;
  }
}
</style>
