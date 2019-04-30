<template>
  <a-row type="flex" style="height: 100%;">
    <a-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
      <div class="charts-box">
        <div class="charts-box-item title">
          <h3>{{title}}</h3>
          <h4>{{totalValue}}</h4>
        </div>
        <div class="charts-box-item charts">
          <charts :option="option"/>
        </div>
      </div>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
      <div class="list-box">
        <ul>
          <li class="list-item" v-for="(item, index) in rootDate" :key="index" @click="handleVisible(index)">
            <span class="dot" :style="{'background': item.itemStyle.color}" v-show="item.visible"/>
            <span class="dot" v-show="!item.visible"/>
            <span class="name">{{item.name}}</span>
            <span class="value">{{`￥${item.value}`}}</span>
          </li>
        </ul>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import Charts from '@/components/Charts'
const fakeDateList = []
for (let i = 0; i < 7; i += 1) {
  fakeDateList.push(
    { value: 335, name: '直接访问' }
  )
}
export default {
  name: 'index',
  components: {
    'charts': Charts
  },
  props: {
    id: '',
    title: {
      default: '总值'
    }
  },
  mounted () {
    const _rootDate = this.rootDate.filter(item => item.visible = true)
    const _rootDate_ = _rootDate.filter(item => item.itemStyle = {color: `rgb${this.getColor()}`})
    this.rootDate = _rootDate_
  },
  data () {
    return {
      rootDate: fakeDateList,
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
  computed: {
    totalValue () {
      let _totalValue = 0
      this.rootDate.filter(item => _totalValue += item.value)
      return _totalValue
    }
  },
  methods: {
    handleVisible (index) {
      this.rootDate[index].visible = !this.rootDate[index].visible
      this.chartsDate = this.rootDate.filter(item => item.visible)
    },
    getColor () {
      return '(' + [
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255)
      ].join(',') + ')'
    }
  },
  watch: {
    chartsDate: function () {
      this.option.series[0].data = this.chartsDate
      const _rootDate = this.rootDate
      this.rootDate = this.chartsDate
      this.rootDate = _rootDate
    }
  }
}
</script>

<style lang="scss" scoped>
.charts-box {
  position: relative;
  min-height: 150px;
  width: 100%;
  height: 100%;
  .charts-box-item {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &.title {
      z-index: 1;
    }
  }
}
.list-box {
  display: flex;
  align-items: center;
  height: 100%;
  ul {
    width: 100%;
  }
  .list-item{
    padding: 0 0 8px;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      color: rgb(24, 144, 255);
    }
    .dot {
      display: inline-block;
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background: rgb(161, 161, 161);
      margin-right: 8px;
    }
    .value {
      float: right;
    }
  }
}
</style>
