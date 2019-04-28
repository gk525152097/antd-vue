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
        <div class="box">
          <title-box title="活动情况预测">
            <templeta slot="body">
              ss
            </templeta>
          </title-box>
        </div>
        <div class="box">
          <title-box title="券核效率">
            <templeta slot="body">
              ss
            </templeta>
          </title-box>
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
             ss
           </templeta>
         </title-box>
       </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        <div class="box">
          <title-box title="资源剩余">
            <templeta slot="body">
              ss
            </templeta>
          </title-box>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import TitleBox from '@/components/TitleBox'
export default {
  name: 'index',
  components: {
    'title-box': TitleBox
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin: 0 0 12px;
}
</style>
