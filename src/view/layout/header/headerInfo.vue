<template>
  <a-popover trigger="click" placement="bottomLeft">
    <template slot="content" class="popover-content">
      <a-tabs defaultActiveKey="1" :tabBarStyle="{'text-align': 'center'}" style="width: 320px">
        <a-tab-pane v-bind:tab="'通知 (' + inform.length + ')'" key="1">
          <header-info-box title="通知" :infoList="inform" @removeItem="removeInfo" @addMore="addInfo" />
        </a-tab-pane>
        <a-tab-pane v-bind:tab="'消息 (' + information.length + ')'" key="2" forceRender>
          <header-info-box title="消息" :infoList="information" @removeItem="removeInformation" @addMore="addInformation" />
        </a-tab-pane>
        <a-tab-pane v-bind:tab="'待办 (' + backlog.length + ')'" key="3">
          <header-info-box title="待办" :infoList="backlog" @removeItem="removeBacklog" @addMore="addBacklog" />
        </a-tab-pane>
      </a-tabs>
    </template>
    <a-badge :count="inform.length + information.length + backlog.length"><a-icon type="bell" /></a-badge>
  </a-popover>
</template>

<script>
import HeaderInfoBox from './components/HeaderInfoBox'
export default {
  name: 'headerInfo',
  components: {
    HeaderInfoBox
  },
  data () {
    return {
      inform: [
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          text: '你收到了 14 份新周报',
          time: '2019-04-27'
        },
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          text: '你推荐的 曲妮妮 已通过第三轮面试',
          time: '1556416996000'
        },
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          text: '这种模板可以区分多种通知类型',
          time: '2017-08-09'
        },
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          text: '左侧图标用于区分不同的类型',
          time: '2017-08-09'
        }
      ],
      information: [
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: '曲丽丽 评论了你',
          text: '描述信息描述信息描述信息',
          time: '2017-08-09'
        },
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: '朱偏右 回复了你',
          text: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
          time: '2017-08-09'
        },
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: '标题',
          text: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
          time: '2018-08-09'
        }
      ],
      backlog: [
        {
          title: '第三方紧急代码变更',
          text: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
          status: {
            text: '马上到期',
            color: '#f5222d'
          }
        },
        {
          title: '任务名称',
          text: '任务需要在 2017-01-12 20:00 前启动',
          status: {
            text: '未开始',
            color: 'rgba(0,0,0,.65)'
          }
        }
      ]
    }
  },
  methods: {
    removeInfo (num) {
      this.inform = this.inform.filter((item, index) => index !== num)
    },
    removeInformation (num) {
      this.information = this.information.filter((item, index) => index !== num)
    },
    removeBacklog (num) {
      this.backlog = this.backlog.filter((item, index) => index !== num)
    },
    addInfo () {
      this.inform.push(
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          text: '你收到了 14 份新周报',
          time: Number(new Date())
        }
      )
    },
    addInformation () {
      this.information.push(
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: '朱偏右 回复了你',
          text: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
          time: '2019-02-07'
        }
      )
    },
    addBacklog () {
      this.backlog.push(
        {
          title: '信息安全考试',
          text: '指派竹尔于 2017-01-09 前完成更新并发布',
          status: {
            text: '进行中',
            color: '#1890ff'
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.popover-content {
  margin-top: 14px;
}
</style>
