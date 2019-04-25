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
                  ref="echarts1"
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
                  :option="barSmall2"
                  ref="echarts2"
                />
              </template>
            </header-card>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
          <div class="header-card-item">
            <header-card Title="总销售额" BodyData="123456" Footer="日销售额">
              <template slot="echarts" >
                <div class="rate">
                  <span>周同比 12%<a-icon class="up" type="caret-up" /></span>
                  <span>周同比 12%<a-icon class="down" type="caret-down" /></span>
                </div>
              </template>
            </header-card>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
          <div class="header-card-item">
            <header-card Title="总销售额" BodyData="123456" Footer="日销售额">
              <template slot="echarts" >
                <a-tooltip>
                  <template slot='title'>
                    当前值:78% 目标值:80%
                  </template>
                  <div class="goal-percent">
                    <div class="goal" style="left: 80%"/>
                    <div class="bottom-bar"/>
                    <div class="bar" style="width: 78%"/>
                  </div>
                </a-tooltip>
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
            <a-row>
              <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                <div class="echarts-bar tabs-items">
                  <h1>销售趋势</h1>
                  <i-echarts
                    :option="bar"
                    ref="echarts3"
                  />
                </div>
              </a-col>
              <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
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
              </a-col>
            </a-row>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="访问量" key="2">
          <div class="tabs-item">
            <a-row>
              <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                <div class="echarts-bar tabs-items">
                  <h1>访问趋势</h1>
                  <i-echarts
                    :option="bar"
                    ref="echarts4"
                  />
                </div>
              </a-col>
              <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
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
              </a-col>
            </a-row>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <a-row :gutter="12">
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="center-box">
          <title-box title="线上热门搜索">
            <templeta name="action">
              <a-dropdown placement="bottomRight" style="padding: 0 12px">
                <a href="#">
                  <a-icon type="ellipsis" />
                </a>
                <a-menu slot="overlay" @click="onClick">
                  <a-menu-item key="1">操作1</a-menu-item>
                  <a-menu-item key="2">操作2</a-menu-item>
                  <a-menu-item key="3">操作3</a-menu-item>
                </a-menu>
              </a-dropdown>
            </templeta>
            <templeta name="body">
              <a-row :gutter="12">
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="person-card">
                    <p>
                      搜索用户数
                      <a-tooltip>
                        <template slot='title'>
                          指标说明
                        </template>
                        <a-icon type="exclamation-circle" />
                      </a-tooltip>
                    </p>
                    <h1>12,321 <span>17.4<a-icon style="color: red" type="caret-up" /></span></h1>
                    <div class="echart">
                      <i-echarts
                        :option="barSmall2"
                        ref="echarts5"
                      />
                    </div>
                  </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="person-card">
                    <p>
                      人均搜索次数
                      <a-tooltip>
                        <template slot='title'>
                          指标说明
                        </template>
                        <a-icon type="exclamation-circle" />
                      </a-tooltip>
                    </p>
                    <h1>2.7 <span>26.2<a-icon style="color: greenyellow" type="caret-down" /></span></h1>
                    <div class="echart">
                      <i-echarts
                        :option="barSmall2"
                        ref="echarts6"
                      />
                    </div>
                  </div>
                </a-col>
              </a-row>
              <a-table :columns="columns" :dataSource="data" size="small" :pagination="pagination" />
            </templeta>
          </title-box>
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="center-box">
          <title-box title="销售额类别占比">
            <template slot="action">
              <a-radio-group value="large">
                <a-radio-button value="large">全部渠道</a-radio-button>
                <a-radio-button value="default">线上</a-radio-button>
                <a-radio-button value="small">门店</a-radio-button>
              </a-radio-group>
              <a-dropdown placement="bottomRight" style="padding: 0 12px">
                <a href="#">
                  <a-icon type="ellipsis" />
                </a>
                <a-menu slot="overlay" @click="onClick">
                  <a-menu-item key="1">操作1</a-menu-item>
                  <a-menu-item key="2">操作2</a-menu-item>
                  <a-menu-item key="3">操作3</a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
            <template slot="body">
              <!--<pie id="echarts7"/>-->
            </template>
          </title-box>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script type="text/jsx">
import IEcharts from 'vue-echarts-v3/src/full.js'
import HeaderCard from '@/components/HeaderCard'
import TitleBox from '@/components/TitleBox'
import Pie from '@/components/Pie'
const salesData = {
  x: [],
  y: [],
  barSmall2: []
}
for (let i = 0; i < 12; i += 1) {
  salesData.x.push(`${i + 1}月`)
  salesData.y.push(Math.floor(Math.random() * 1000) + 200)
  salesData.barSmall2.push(Math.floor(Math.random() * 1000) + 200)
}

const columns = [
  {
  title: 'Name',
  dataIndex: 'name',
  width: 150,
},
  {
  title: 'Age',
  dataIndex: 'age',
  width: 150,
},
  {
  title: 'Address',
  dataIndex: 'address',
}];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default {
  name: 'index',
  components: {
    'i-echarts': IEcharts,
    'header-card': HeaderCard,
    'title-box': TitleBox,
    'pie': Pie
  },
  mounted () {
    // echarts resize 需要确定是否存在 和 层级关系
    window.onresize = () => {
      this.$refs.echarts1.resize()
      this.$refs.echarts2.resize()
      this.$refs.echarts3.resize()
      this.$refs.echarts5.resize()
      this.$refs.echarts6.resize()

      this.$refs.echarts4.resize()
    }
    setTimeout(() => {
      this.$refs.echarts1.resize()
      this.$refs.echarts2.resize()
      this.$refs.echarts3.resize()
      this.$refs.echarts5.resize()
      this.$refs.echarts6.resize()

      this.$refs.echarts4.resize()
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
    barSmall2:  {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        top: '10%',
        left: '1%',
        right: '1%',
        bottom: '10%'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        show: false,
        data: salesData.x
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [
        {
          type:'line',
          stack: '总量',
          data: salesData.y,
          smooth: true,
          areaStyle: {}
        },
      ],
      color: ['rgba(151, 95, 228, 1)']
    },
    rankingList: [
      { name: '工专路 0 号店', value: 323234 },
      { name: '工专路 0 号店', value: 323234 },
      { name: '工专路 0 号店', value: 323234 },
      { name: '工专路 0 号店', value: 323234 },
      { name: '工专路 0 号店', value: 323234 },
      { name: '工专路 0 号店', value: 323234 },
      { name: '工专路 0 号店', value: 323234 }
    ],
    data,
    columns,
    pagination: {
      defaultCurrent: 1,
      defaultPageSize: 5
    }
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
      .rate {
        font-size: 14px;
        flex: 1;
        .up {
          font-size: 10px;
          color: red;
          padding: 0 4px;
        }
        .down {
          font-size: 10px;
          color: greenyellow;
          padding: 0 4px;
        }
      }
      .goal-percent {
        position: relative;
        flex: 1;
        .goal {
          position: absolute;
          z-index: 1;
          height: 18px;
          margin: -5px 0 0 0;
          border-left: 4px solid rgb(19, 194, 194);
        }
        .bottom-bar {
          position: absolute;
          width: 100%;
          height: 8px;
          background: #f5f5f5;
          z-index: 2;
        }
        .bar {
          position: absolute;
          height: 8px;
          background: rgb(19, 194, 194);
          z-index: 3;
        }
      }
    }
  }
  .statistics {
    background: #fff;
    padding: 8px;
    margin-bottom: 12px;
    .tabsOperation{
      display: inline-block;
      a {
        padding: 0 12px 0 0;
      }
    }
    .tabs-item {
      .tabs-items {
        height: 320px;
        h1 {
          font-size: 12px;
          padding: 0 12px;
        }
      }
      .ranking {
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
  .center-box {
    margin-bottom: 12px;
    .person-card {
      p {
        margin: 0;
        color: #a8a8a8;
      }
      h1 {
        margin: 4px 0;
        span {
          font-size: 10px;
          margin: 0 12px;
          i {
            margin: 0 4px;
          }
        }
      }
      .echart {
        height: 40px;
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
    }
  }
}
</style>
