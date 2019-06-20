<template>
    <div class="menuManage">
      <a-row :gutter="12" style="display: flex; align-items: stretch">
        <a-col :xs="24" :sm="24" :md="6" :lg="5" :xl="4">
          <div class="tree">
            <Tree />
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="18" :lg="19" :xl="20">
          <div class="workArea">
            <dragTreeTable :data="treeData" :onDrag="onTreeDataChange"></dragTreeTable>
          </div>
        </a-col>
      </a-row>
    </div>
</template>

<script>
import Tree from './tree'
import dragTreeTable from 'drag-tree-table'
export default {
  name: 'index',
  components: {
    Tree,
    dragTreeTable
  },
  data () {
    return {
      treeData: {
        lists: [
          {
            'id': 40,
            'parent_id': 0,
            'order': 0,
            'name': '动物类',
            'open': true,
            'lists': []
          }, {
            'id': 5,
            'parent_id': 0,
            'order': 1,
            'name': '昆虫类',
            'open': true,
            'lists': [
              {
                'id': 12,
                'parent_id': 5,
                'open': true,
                'order': 0,
                'name': '蚂蚁',
                'lists': []
              }
            ]
          },
          {
            'id': 19,
            'parent_id': 0,
            'order': 2,
            'name': '植物类',
            'open': true,
            'lists': []
          }
        ],
        columns: [
          {
            type: 'selection',
            title: '名称',
            field: 'name',
            width: 200,
            align: 'center',
            formatter: (item) => {
              return '<a>' + item.name + '</a>'
            }
          },
          {
            title: '操作',
            type: 'action',
            width: 350,
            align: 'center',
            actions: [
              {
                text: '查看角色',
                onclick: this.onDetail,
                formatter: (item) => {
                  return '<i>查看角色</i>'
                }
              },
              {
                text: '编辑',
                onclick: this.onEdit,
                formatter: (item) => {
                  return '<i>编辑</i>'
                }
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    onTreeDataChange (lists) {
      this.treeData.lists = lists
      console.log(lists)
    },
    onDetail (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.menuManage {
  width: 100%;
  .tree {
    background: #fff;
  }
  .workArea {
    height: 100%;
    background: #fff;
    padding: 12px;
    .btn {
      float: right;
    }
  }
}
</style>
