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
          text: 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
          time: '1'
        },
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          text: 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
          time: '2'
        },
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          text: 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
          time: '3'
        },
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          text: 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
          time: '4'
        }
      ],
      information: [
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: 'cesssssssssssssssssssssssssssssss',
          text: 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
          time: '1'
        },
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: 'cesssssssssssssssssssssssssssssss',
          text: 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
          time: '1'
        },
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: 'cesssssssssssssssssssssssssssssss',
          text: 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
          time: '1'
        }
      ],
      backlog: [
        {
          title: 'cesssssssssssssssssssssssssssssss',
          text: 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
          status: {
            text: '等待',
            color: '#245724'
          }
        },
        {
          title: 'cesssssssssssssssssssssssssssssss',
          text: 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
          status: {
            text: '等待',
            color: '#245724'
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
          text: 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
          time: '2'
        }
      )
    },
    addInformation () {
      this.information.push(
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: 'cesssssssssssssssssssssssssssssss',
          text: 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
          time: '1'
        }
      )
    },
    addBacklog () {
      this.backlog.push(
        {
          title: 'cesssssssssssssssssssssssssssssss',
          text: 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
          status: {
            text: '等待',
            color: '#245724'
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
