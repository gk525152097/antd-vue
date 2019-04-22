<!--suppress ALL -->
<template>
  <div class="dashboard">
    <div class="header-card">
      <a-row :gutter="12">
        <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
          <div class="header-card-item">
            <header-card Title="总销售额" BodyData="123456" Footer="日销售额">
              <template slot="echarts" >
                <i-echarts
                  :option="barSmall"
                  @click="onClick"
                  ref="barSmall1"
                />
              </template>
            </header-card>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
          <div class="header-card-item">
            <header-card Title="总销售额" BodyData="123456" Footer="日销售额">
              <template slot="echarts" >
                <i-echarts
                  :option="barSmall"
                  @click="onClick"
                  ref="barSmall2"
                />
              </template>
            </header-card>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
          <div class="header-card-item">
            <header-card Title="总销售额" BodyData="123456" Footer="日销售额">
              <template slot="echarts" >
                <i-echarts
                  :option="barSmall"
                  @click="onClick"
                  ref="barSmall3"
                />
              </template>
            </header-card>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
          <div class="header-card-item">
            <header-card Title="总销售额" BodyData="123456" Footer="日销售额">
              <template slot="echarts" >
                <i-echarts
                  :option="barSmall"
                  @click="onClick"
                  ref="barSmall4"
                />
              </template>
            </header-card>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="statistics">
      <a-tabs defaultActiveKey="1">
        <template slot="tabBarExtraContent" >
          <div class="tabsOperation">
            <a href="#">今日</a>
            <a href="#">本周</a>
            <a href="#">本月</a>
            <a href="#">全年</a>
          </div>
          <a-range-picker showTime format="YYYY-MM-DD HH:mm:ss" />
        </template>
        <a-tab-pane tab="销售额" key="1">
          <div class="tabs-item">
            <div class="echarts-bar tabs-items">
              <h1>销售趋势</h1>
              <i-echarts
                :option="bar"
                @click="onClick"
                ref="test"
              />
            </div>
            <div class="ranking tabs-items">
              <h1>门店销售额排名</h1>
              <ul>
                <li v-for="(item, index) in rankingList" v-bind:key="index">
                  <a-badge :count="index + 1" :numberStyle="index > 3 ? badge : badgeTop" />
                  {{item.name}}
                  <span class="value">{{parseFloat(item.value).toLocaleString()}}</span>
                </li>
              </ul>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="访问量" key="2">
          <div class="tabs-item">
            <div class="echarts-bar tabs-items">
              <h1>访问趋势</h1>
              <i-echarts
                :option="bar"
                @click="onClick"
                ref="test"
              />
            </div>
            <div class="ranking tabs-items">
              <h1>门店访问量排名</h1>
              <ul>
                <li v-for="(item, index) in rankingList" v-bind:key="index">
                  <a-badge :count="index + 1" :numberStyle="index > 3 ? badge : badgeTop" />
                  {{item.name}}
                  <span class="value">{{parseFloat(item.value).toLocaleString()}}</span>
                </li>
              </ul>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script type="text/jsx">
import IEcharts from 'vue-echarts-v3/src/full.js'
import HeaderCard from '@/components/HeaderCard'
const salesData = {
  x: [],
  y: []
}
for (let i = 0; i < 12; i += 1) {
  salesData.x.push(`${i + 1}月`)
  salesData.y.push(Math.floor(Math.random() * 1000) + 200)
}
export default {
  name: 'index',
  components: {
    'i-echarts': IEcharts,
    'header-card': HeaderCard
  },
  mounted () {
    window.onresize = () => {
      this.$refs.test.resize()
      this.$refs.barSmall1.resize()
      this.$refs.barSmall2.resize()
      this.$refs.barSmall3.resize()
      this.$refs.barSmall4.resize()
    }
    setTimeout(() => {
      this.$refs.test.resize()
      this.$refs.barSmall1.resize()
      this.$refs.barSmall2.resize()
      this.$refs.barSmall3.resize()
      this.$refs.barSmall4.resize()
    }, 10)
  },
  data: () => ({
    badge: {
      backgroundColor: '#a1a1a1',
      'vertical-align': 'text-top',
      margin: '0 8px 0 0'
    },
    badgeTop: {
      backgroundColor: '#314659',
      'vertical-align': 'text-top',
      margin: '0 8px 0 0'
    },
    bar: {
      grid: {
        top: 24,
        left: 24,
        right: 24,
        bottom: 36,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      xAxis: {
        data: salesData.x
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          barWidth: '40%',
          data: salesData.y
        }
      ],
      color: ['rgba(84, 171, 251, 1)']
    },
    barSmall: {
      grid: {
        top: '10%',
        left: '1%',
        right: '1%',
        bottom: '10%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      xAxis: {
        show: false,
        data: salesData.x
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'bar',
          barWidth: '40%',
          data: salesData.y
        }
      ],
      color: ['rgba(84, 171, 251, 1)']
    },
    rankingList: [
      { name: '工专路 0 号店', value: 323234 },
      { name: '工专路 0 号店', value: 323234 },
      { name: '工专路 0 号店', value: 323234 },
      { name: '工专路 0 号店', value: 323234 },
      { name: '工专路 0 号店', value: 323234 },
      { name: '工专路 0 号店', value: 323234 },
      { name: '工专路 0 号店', value: 323234 }
    ]
  }),
  methods: {
    onClick (event, instance, ECharts) {
      console.log(arguments)
    }
  }
  // todo 首页模块仿制
}
</script>

<style lang="scss" scoped>
.dashboard {
  .header-card{
    .header-card-item {
      margin: 0 0 12px 0;
    }
  }
  .statistics {
    background: #fff;
    padding: 8px;
    .tabsOperation{
      display: inline-block;
      a {
        padding: 0 12px 0 0;
      }
    }
    .tabs-item {
      height: 320px;
      display: flex;
      flex-direction: row;
      .tabs-items {
        h1 {
          font-size: 12px;
          padding: 0 12px;
        }
      }
      .echarts-bar {
        flex: 1;
      }
      .ranking {
        width: 500px;
        overflow: hidden;
        ul {
          margin-top: 20px;
          li {
            .badge {

            }
            .badge-top {
              background: #314659;
            }
            padding: 8px 0;
            .value {
              margin: 0 12px 0 0;
              float: right;
            }
          }
        }
      }
    }
  }
}
</style>
