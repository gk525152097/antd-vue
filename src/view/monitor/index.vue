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
                ss
              </template>
            </title-box>
          </div>
          <div class="box left-box-item">
            <title-box title="券核效率">
              <template slot="body">
                ss
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
                        <p>测试</p>
                        <h3>24%</h3>
                      </div>
                    </div>
                    <charts :option="optionPie"/>
                  </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                  <div class="pie-item">
                    <div class="title">
                      <div>
                        <p>测试</p>
                        <h3>24%</h3>
                      </div>
                    </div>
                    <charts :option="optionPie"/>
                  </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                  <div class="pie-item">
                    <div class="title">
                      <div>
                        <p>测试</p>
                        <h3>24%</h3>
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
export default {
  name: 'index',
  components: {
    'title-box': TitleBox,
    'charts': Charts
  },
  data () {
    return {
      optionLiquidFill: {
        series: [{
          type: 'liquidFill',
          data: [0.6, 0.5, 0.4, 0.3],
          radius: '80%'
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
      }
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
  height: 452px;
  text-align: center;
  .img {
    height: 100%;
    width: auto;
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
</style>
