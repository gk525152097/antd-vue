<template>
  <div>
    <a-row :gutter="12" type="flex">
      <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <div class="box">
          <title-box title="活动实时交易情况">
            <templeta slot="body">
              ss
            </templeta>
          </title-box>
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        <div class="left-box">
          <div class="box left-box-item">
            <title-box title="活动情况预测">
              <templeta slot="body">
                ss
              </templeta>
            </title-box>
          </div>
          <div class="box left-box-item">
            <title-box title="券核效率">
              <templeta slot="body">
                ss
              </templeta>
            </title-box>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="12">
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="box">
          <title-box title="各品类占比">
            <templeta slot="body">
              ss
            </templeta>
          </title-box>
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
       <div class="box">
         <title-box title="热门搜索">
           <templeta slot="body">
             <charts
               :option="barSmall"
               refid="test2"
             />
           </templeta>
         </title-box>
       </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        <div class="box">
          <title-box title="资源剩余">
            <templeta slot="body">
              <charts
                :option="barSmall"
                refid="test"
              />
            </templeta>
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.left-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  .left-box-item {
    flex: 1;
  }
}
.box {
  height: 100%;
  padding: 0 0 12px;
}
</style>
