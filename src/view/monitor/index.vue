<template>
  <div>
    <a-row :gutter="12" type="flex">
      <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <div class="box">
          <title-box title="活动实时交易情况">
            <template slot="body">
              <a-row>
                <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                  <div class="map-title-item">
                    <p>今日交易总额</p>
                    <h2>{{parseFloat(124543233).toLocaleString()}}<span>元</span></h2>
                  </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                  <div class="map-title-item">
                    <p>销售目标完成率</p>
                    <h2>92%</h2>
                  </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                  <div class="map-title-item">
                    <p>活动剩余时间</p>
                    <h2>{{Math.round(new Date().getTime() / 1000)}}</h2>
                  </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                  <div class="map-title-item">
                    <p>每秒交易总额</p>
                    <h2>{{parseFloat(1324).toLocaleString()}}<span>元</span></h2>
                  </div>
                </a-col>
              </a-row>
              <div class="map">
                <a-tooltip>
                  <template slot="title">
                    <span>fakeMap</span>
                  </template>
                  <img class="img" src="../../assets/monitor/fakeMap.png" alt="map">
                </a-tooltip>
              </div>
            </template>
          </title-box>
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        <div class="left-box">
          <div class="box left-box-item">
            <title-box title="活动情况预测">
              <template slot="body">
                <div class="echart-line">
                  <div class="title">
                    <p>目标评估</p>
                    <h2>有望达到预期</h2>
                  </div>
                  <div class="echart">
                    <charts :option="optionLine"/>
                  </div>
                </div>
              </template>
            </title-box>
          </div>
          <div class="box left-box-item">
            <title-box title="券核效率">
              <template slot="body">
                <charts :option="optionGauge"/>
              </template>
            </title-box>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="12" type="flex">
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="box">
          <title-box title="各品类占比">
            <template slot="body">
              <a-row type="flex" style="height: 100%; justify-content: stretch">
                <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                  <div class="pie-item">
                    <div class="title">
                      <div>
                        <p>中式快餐</p>
                        <h3>28%</h3>
                      </div>
                    </div>
                    <charts :option="optionPie"/>
                  </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                  <div class="pie-item">
                    <div class="title">
                      <div>
                        <p>西餐</p>
                        <h3>22%</h3>
                      </div>
                    </div>
                    <charts :option="optionPie"/>
                  </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                  <div class="pie-item">
                    <div class="title">
                      <div>
                        <p>火锅</p>
                        <h3>32%</h3>
                      </div>
                    </div>
                    <charts :option="optionPie"/>
                  </div>
                </a-col>
              </a-row>
            </template>
          </title-box>
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
       <div class="box">
         <title-box title="热门搜索">
           <template slot="body">
             <charts :option="optionWordCloud"/>
           </template>
         </title-box>
       </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        <div class="box">
          <title-box title="资源剩余">
            <template slot="body">
              <div class="LiquidFill">
                <charts :option="optionLiquidFill"/>
              </div>
            </template>
          </title-box>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Charts from '@/components/Charts'
import TitleBox from '@/components/TitleBox'
import echarts from 'echarts'
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

let now = +new Date(1997, 9, 3)
let oneDay = 24 * 3600 * 1000
let value = Math.random() * 1000

export default {
  name: 'index',
  components: {
    'title-box': TitleBox,
    'charts': Charts
  },
  mounted () {
    for (let i = 0; i < 1000; i += 1) {
      this.lineData.push(this.randomData())
    }
    setInterval(() => {
      for (let i = 0; i < 5; i += 1) {
        this.lineData.shift()
        this.lineData.push(this.randomData())
      }
    }, 1000)
  },
  data () {
    return {
      lineData: [],
      optionLiquidFill: {
        series: [{
          type: 'liquidFill',
          data: [0.6, 0.55, 0.4, 0.25],
          radius: '90%',
          outline: {
            show: false
          },
          backgroundStyle: {
            borderColor: '#156ACF',
            borderWidth: 1,
            shadowColor: 'rgba(0, 0, 0, 0.4)',
            shadowBlur: 20
          },
          shape: 'path://M367.855,428.202c-3.674-1.385-7.452-1.966-11.146-1.794c0.659-2.922,0.844-5.85,0.58-8.719 c-0.937-10.407-7.663-19.864-18.063-23.834c-10.697-4.043-22.298-1.168-29.902,6.403c3.015,0.026,6.074,0.594,9.035,1.728 c13.626,5.151,20.465,20.379,15.32,34.004c-1.905,5.02-5.177,9.115-9.22,12.05c-6.951,4.992-16.19,6.536-24.777,3.271 c-13.625-5.137-20.471-20.371-15.32-34.004c0.673-1.768,1.523-3.423,2.526-4.992h-0.014c0,0,0,0,0,0.014 c4.386-6.853,8.145-14.279,11.146-22.187c23.294-61.505-7.689-130.278-69.215-153.579c-61.532-23.293-130.279,7.69-153.579,69.202 c-6.371,16.785-8.679,34.097-7.426,50.901c0.026,0.554,0.079,1.121,0.132,1.688c4.973,57.107,41.767,109.148,98.945,130.793 c58.162,22.008,121.303,6.529,162.839-34.465c7.103-6.893,17.826-9.444,27.679-5.719c11.858,4.491,18.565,16.6,16.719,28.643 c4.438-3.126,8.033-7.564,10.117-13.045C389.751,449.992,382.411,433.709,367.855,428.202z',
          label: {
            normal: {
              position: ['38%', '40%'],
              textStyle: {
                fontSize: 40,
                color: '#D94854'
              }
            }
          }
        }]

      },
      optionPie: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} {c} ({d}%)'
        },
        series: [
          {
            name: '数值',
            type: 'pie',
            radius: ['40%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 335, itemStyle: {color: 'rgb(88, 175, 255)'}},
              {value: 1548, itemStyle: {color: 'rgba(0, 0, 0, 0.1)'}}
            ]
          }
        ]
      },
      optionWordCloud: {
        tooltip: {
          show: true
        },
        series: [{
          name: '热点分析', // 数据提示窗标题
          type: 'wordCloud',
          sizeRange: [6, 66], // 画布范围，如果设置太大会出现少词（溢出屏幕）
          rotationRange: [-45, 90], // 数据翻转范围
          // shape: 'circle',
          textPadding: 0,
          autoSize: {
            enable: true,
            minSize: 6
          },
          textStyle: {
            normal: {
              color: function () {
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')'
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: [
            {name: '数据一', value: 1000},
            {name: '数据2', value: 1452},
            {name: '数据3', value: 21},
            {name: '数据4', value: 2123},
            {name: '数据5', value: 321},
            {name: '数据6', value: 252},
            {name: '数据7', value: 24},
            {name: '数据8', value: 632}
          ]
        }]
      },
      optionLine: {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0]
            let date = new Date(params.name)
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1]
          },
          axisPointer: {
            animation: false
          }
        },
        grid: {
          top: '1%',
          left: '1%',
          right: '1%',
          bottom: '1%'
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          },
          show: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          },
          show: false
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.lineData,
          areaStyle: {},
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          }
        }]
      },
      optionGauge: {
        tooltip: {
          show: true,
          // formatter: "{a} <br/>{b} {c}",
          backgroundColor: '#F7F9FB',
          borderColor: '#92DAFF',
          borderWidth: '1px',
          textStyle: {
            color: 'black'
          },
          formatter: function (param) {
            return '<em style="color:' + param.color + ';">' + param.value + '</em> 分'
          }

        },
        series: [{
          name: '信用分',
          type: 'gauge',
          min: 0,
          max: 1000,
          axisLine: {
            show: true,
            lineStyle: {
              width: 14,
              shadowBlur: 0,
              color: [
                [
                  1, new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, [{
                      offset: 0,
                      color: '#ae3df6'
                    },
                    {
                      offset: 1,
                      color: '#53bef9'
                    }
                    ]
                  )
                ],
                [
                  1, '#222e7d'
                ]
              ]
            }
          },
          axisTick: {
            show: false,
            splitNumber: 1
          },
          splitLine: {
            show: false,
            length: 40,
            lineStyle: {
              // color:'black'
            }
          },
          axisLabel: {
            formatter: function (e) {
              switch (e + '') {
                case '100':
                  return '较差'
                case '300':
                  return '中等'
                case '500':
                  return '良好'
                case '700':
                  return '优秀'
                case '900':
                  return '极好'
                default:
                  return ''
              }
            },
            textStyle: {
              fontSize: 12,
              fontWeight: ''
            }
          },
          pointer: {
            show: true
          },
          detail: {
            // show:false,
            formatter: function (param) {
              let level = ''
              if (param < 470) {
                level = '较差'
              } else if (param < 590) {
                level = '中等'
              } else if (param < 710) {
                level = '良好'
              } else if (param < 830) {
                level = '优秀'
              } else if (param <= 950) {
                level = '极好'
              } else {
                level = '暂无'
              }
              return level
            },
            offsetCenter: [0, 140],
            textStyle: {
              fontSize: 40
            }
          },
          data: [{
            name: '',
            value: 321
          }]
        }]
      }
    }
  },
  methods: {
    randomData () {
      now = new Date(+now + oneDay)
      value = value + Math.random() * 21 - 10
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
          Math.round(value)
        ]
      }
    }
  },
  watch: {
    lineData: function () {
      this.optionLine.series[0].data = this.lineData
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  height: 100%;
  padding: 0 0 12px;
}
.left-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  .left-box-item {
    flex: 1;
  }
}
.map-title-item {
  p {
    font-size: 14px;
    color: rgba(0,0,0,.45);
    margin: 0;
  }
  h2 {
    font-size: 24px;
    color: rgba(0,0,0,.85);
    span {
      font-size: 14px;
      color: rgba(0,0,0,.45);
      margin: 0 0 0 8px;
    }
  }
}
.map {
  text-align: center;
  .img {
    display: inline-block;
    max-width: 100%;
    max-height: 375px;
  }
}
.pie-item {
  height: 100%;
  position: relative;
  .title {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    z-index: 1;
    p, h3 {
      & p {
        color: rgba(0, 0, 0, 0.1);
      }
      margin: 0;
    }
  }
}
.LiquidFill {
  height: 250px;
}
.echart-line {
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    p, h2 {
      margin: 0;
    }
  }
  .echart {
    flex: 1;
  }
}
</style>
