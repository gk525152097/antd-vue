<template>
  <div class="tree">
    <a-spin class="tree-spin" :spinning="loading">
      <a-tree
        class="draggable-tree"
        :defaultExpandedKeys="expandedKeys"
        draggable
        @drop="onDrop"
        @select="select"
        :treeData="treeList"
      />
    </a-spin>
  </div>
</template>

<script>
import transform from '@/utils/transformTree'
export default {
  name: 'treeBox',
  data () {
    return {
      expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
      treeList: [],
      dropKey: 0,
      dropItem: {},
      dropList: [],
      loading: false
    }
  },
  mounted () {
    this.$store.dispatch('getMenuList')
  },
  methods: {
    select (info) {
      console.log(info)
    },
    onDrop (info) {
      console.log(info)
      this.loading = true
      this.dropItem = info.dragNode.dataRef
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
      this.treeList = data
      this.handleChangeTree()
    },
    handleChangeTree () {
      this.loading = false
      if (!this.dropList.length && this.dropKey === this.dropItem.parentId) {
        this.loading = false
      } else {
        this.$store.dispatch('handleChangeTree', {
          dropKey: this.dropKey,
          dropItem: this.dropItem,
          dropList: this.dropList
        })
      }

      console.log(this.dropKey)
      console.log(this.dropItem)
      console.log(this.dropList)

      this.dropKey = 0
      this.dropItem = {}
      this.dropList = []
    }
  },
  computed: {
    treeData () {
      return transform(this.$store.getters.menumanage.list)
    }
  },
  watch: {
    treeData () {
      this.treeList = this.treeData
      this.loading = false
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
