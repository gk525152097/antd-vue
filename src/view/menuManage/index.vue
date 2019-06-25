<template>
    <div class="menuManage">
      <a-row :gutter="12" style="display: flex; align-items: stretch">
        <a-col :xs="24" :sm="24" :md="6" :lg="5" :xl="4">
          <div class="tree">
            <TreeBox />
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="18" :lg="19" :xl="20">
          <div class="work-area">
            <div class="menu-item">
              <div class="btn-area">
                <a-button type="primary">新增菜单</a-button>
                <a-button>编辑菜单</a-button>
              </div>
              <div class="menu-info">
                <p><a-icon type="book" class="icon"/><span>菜单管理</span></p>
                <p><span class="title">path: </span>/menuManage</p>
                <p><span class="title">component: </span>/menuManage/index</p>
                <p><span class="title">redirect: </span>false</p>
                <p><span class="title">hidden: </span>true</p>
              </div>
            </div>
            <div class="menu-list">
              <TableBox />
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
</template>

<script>
import TreeBox from './treeBox'
import TableBox from './tableBox'
export default {
  name: 'index',
  components: {
    TreeBox,
    TableBox
  },
  data () {
    return {
    }
  },
  methods: {
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
      .btn-area {
        margin-bottom: 12px;
      }
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
