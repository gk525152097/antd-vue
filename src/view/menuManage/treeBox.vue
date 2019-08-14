<template>
  <div class="tree">
    <a-spin class="tree-spin" :spinning="loading">
      <a-tree
        class="draggable-tree"
        draggable
        @drop="onDrop"
        @select="handleMenuItem"
        :treeData="treeList"
      />
    </a-spin>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import transform from '@/utils/transformTree'
export default {
  name: 'treeBox',
  mounted () {
    this.$store.dispatch('handleTreeLoading')
    this.$store.dispatch('getMenuTree')
      .then()
      .catch()
      .finally(() => {
        this.$store.dispatch('handleTreeLoading')
      })

    // 默认请求根目录信息
    this.$store.dispatch('handleInfoLoading')
    this.$store.dispatch('handleMenuInfo', {id: 1})
      .then()
      .catch()
      .finally(() => {
        this.$store.dispatch('handleInfoLoading')
      })
  },
  data () {
    return {
      treeList: [],
      dropKey: 1, // 上级节点
      dropRank: 0, // 排序
      dropItem: {}, // 当前项
      dropList: [] // 插入上级节点子节点list
    }
  },
  computed: {
    _treeData () {
      return transform(this.$store.getters.menumanage.tree)
    },
    loading () {
      return this.$store.getters.menumanage.treeLoading
    }
  },
  methods: {
    // 获取菜单详情
    handleMenuItem (selectedKeys, e) {
      // 获取当前节点信息
      console.log(e.node.dataRef.id)
      let id = e.node.dataRef.id
      if (id !== this.$store.getters.menumanage.info.id) {
        this.$store.dispatch('handleInfoLoading')
        this.$store.dispatch('handleMenuInfo', {id: id})
          .then()
          .catch()
          .finally(() => {
            this.$store.dispatch('handleInfoLoading')
          })
        this.$store.dispatch('handleTableLoading')
        this.$store.dispatch('getMenuList', {
          id: id,
          page: this.$store.getters.menumanage.page,
          pageSize: this.$store.getters.menumanage.pageSize
        })
          .then()
          .catch()
          .finally(() => {
            this.$store.dispatch('handleTableLoading')
          })
      }
    },
    // 拖动节点
    onDrop (info) {
      // 拖动节点信息
      console.log(info)
      if (info.node.dataRef.key === 1) {
        message.error('根目录不允许存在同级菜单！')
      } else {
        // loading
        this.$store.dispatch('handleTreeLoading')
        // 获取当前拖动的点
        this.dropItem = info.dragNode.dataRef
        //
        const dropKey = info.node.eventKey
        const dragKey = info.dragNode.eventKey
        const dropPos = info.node.pos.split('-')
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
        const loop = (data, key, callback) => {
          data.forEach((item, index, arr) => {
            if (item.key === key) {
              return callback(item, index, arr)
            }
            if (item.children) {
              return loop(item.children, key, callback)
            }
          })
        }
        const data = [...this.treeList]
        // Find dragObject
        let dragObj
        loop(data, dragKey, function (item, index, arr) {
          arr.splice(index, 1)
          dragObj = item
        })

        if (!info.dropToGap) {
          // Drop on the content
          loop(data, dropKey, (item) => {
            this.dropKey = dropKey // 存切换到的位置
            item.children = item.children || []
            // where to insert 示例添加到尾部，可以是随意位置
            item.children.push(dragObj)
            this.dropRank = item.children.length // 获取切换到节点的children长度 以方便修改rank
          })
        } else if (
          (info.node.children || []).length > 0 && // Has children
          info.node.expanded && // Is expanded
          dropPosition === 1 // On the bottom gap
        ) {
          loop(data, dropKey, (item) => {
            this.dropKey = dropKey // 存切换到的位置
            item.children = item.children || []
            // where to insert 示例添加到尾部，可以是随意位置
            item.children.unshift(dragObj)
          })
        } else {
          let ar
          let i
          loop(data, dropKey, (item, index, arr) => {
            ar = arr
            i = index
          })
          this.dropList = ar // 修改排序
          if (dropPosition === -1) {
            ar.splice(i, 0, dragObj)
          } else {
            ar.splice(i + 1, 0, dragObj)
          }
        }
        //
        // console.log(this.dropKey)
        // console.log(this.dropItem)
        // console.log(this.dropList)
        this.handleChangeTree()
      }
    },
    // 修改树结构
    handleChangeTree () {
      // 修改树结构
      console.log(this.dropKey)
      console.log(this.dropItem)
      console.log(this.dropList)

      // this.dropList.shift() ？
      if (!this.dropList.length && this.dropKey === this.dropItem.parentId) {
        this.$store.dispatch('handleTreeLoading')
      } else {
        this.$store.dispatch('handleChangeTree', {
          dropKey: this.dropKey,
          dropRank: this.dropRank,
          dropItem: this.dropItem,
          dropList: this.dropList
        })
          .then(results => {
            console.log(results)
            this.$store.dispatch('getMenuList')
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.$store.dispatch('handleTreeLoading')
          })
      }

      this.dropKey = 1
      this.dropItem = {}
      this.dropList = []
    }
  },
  watch: {
    _treeData () {
      this.treeList = this._treeData
      // this.$store.dispatch('handleTreeLoading')
    }
  }
}
</script>

<style lang="scss" scoped>
  .tree {
    height: 100%;
    .tree-spin {
      height: 100%;
    }
  }
</style>
