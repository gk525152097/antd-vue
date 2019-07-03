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
import { message } from 'ant-design-vue'
import transform from '@/utils/transformTree'
export default {
  name: 'treeBox',
  data () {
    return {
      treeList: [],
      dropKey: 0,
      dropRank: 0,
      dropItem: {},
      dropList: [],
      loading: false
    }
  },
  mounted () {
    this.loading = true
    this.$store.dispatch('getMenuTree')
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    select (info) {
      // 获取当前节点信息
      console.log(info)
      this.$emit('handleLoading')
      let id = info[0]
      if (id) {
        this.$store.dispatch('handleMenuInfo', {id: id})
          .finally(() => {
            this.$emit('handleLoading')
          })
        this.$emit('handleMenuList', id)
      } else {
        this.$store.dispatch('handleMenuInfo')
          .finally(() => {
            this.$emit('handleLoading')
          })
      }
    },
    onDrop (info) {
      // 拖动节点信息
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
      this.handleChangeTree()
    },
    handleChangeTree () {
      // 修改树结构
      console.log(this.dropKey)
      console.log(this.dropItem)
      console.log(this.dropList)

      let root = false
      if (this.dropList.length) {
        this.dropList.forEach(function (item) {
          item.key === 0 ? root = true : null // eslint-disable-line
        })
      }

      if (root) {
        message.error('根目录不允许存在同级菜单！')
        this.$store.dispatch('getMenuList')
          .finally(() => {
            this.loading = false
          })
      } else if (!this.dropList.length && this.dropKey === this.dropItem.parentId) {
        this.loading = false
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
            this.loading = false
          })
      }

      this.dropKey = 0
      this.dropItem = {}
      this.dropList = []
    }
  },
  computed: {
    treeData () {
      return transform(this.$store.getters.menumanage.tree)
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
