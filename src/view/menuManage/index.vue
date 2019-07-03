<template>
    <div class="menuManage">
      <a-row :gutter="12" style="display: flex; align-items: stretch">
        <a-col :xs="24" :sm="24" :md="6" :lg="5" :xl="4">
          <div class="tree">
            <TreeBox @handleLoading="handleLoading" @handleMenuList="handleMenuList" />
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="18" :lg="19" :xl="20">
          <div class="work-area">
            <div class="menu-item">
              <ActionBox />
              <a-spin :spinning="loading">
                <div class="menu-info">
                  <p><a-icon :type="info.icon" class="icon" /><span>{{info.name}}</span></p>
                  <p><span class="title">path: </span>{{info.path}}</p>
                  <p><span class="title">component: </span>{{info.component}}</p>
                  <p><span class="title">redirect: </span>{{info.redirect}}</p>
                  <p><span class="title">hidden: </span>{{Number(info.hidden) ? true : false}}</p>
                </div>
              </a-spin>
            </div>
            <div class="menu-list">
              <TableBox ref="menuTable" />
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
</template>

<script>
import TreeBox from './treeBox'
import TableBox from './tableBox'
import ActionBox from './actionBox'
export default {
  name: 'index',
  components: {
    TreeBox,
    TableBox,
    ActionBox
  },
  data () {
    return {
      loading: false,
      info: this.$store.getters.menumanage.info
    }
  },
  methods: {
    handleLoading () {
      this.loading = !this.loading
    },
    handleMenuList (id) {
      this.$refs.menuTable.getMenuList(id)
    }
  },
  computed: {
    menuInfo () {
      return this.$store.getters.menumanage.info
    }
  },
  watch: {
    menuInfo () {
      this.info = this.menuInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.menuManage {
  width: 100%;
  .tree {
    background: #fff;
    height: 100%;
  }
  .work-area {
    height: 100%;
    display: flex;
    flex-direction: column;
    .menu-item {
      padding: 12px;
      background: #fff;
      margin-bottom: 12px;
      .menu-info {
        p {
          margin: 0;
          .title {
            color: #a1a1a1
          }
        }
        .icon {
          margin-right: 12px;
        }
      }
    }
    .menu-list {
      flex: 1;
      padding: 12px;
      background: #fff;
    }
  }
}
</style>
