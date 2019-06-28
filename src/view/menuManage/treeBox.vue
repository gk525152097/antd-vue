<template>
  <div>
    <a-tree
      class="draggable-tree"
      :defaultExpandedKeys="expandedKeys"
      draggable
      @drop="onDrop"
      @select="select"
      :treeData="treeList"
    />
  </div>
</template>

<script>
const x = 3
const y = 2
const z = 1
const gData = []

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0'
  const tns = _tns || gData

  const children = []
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`
    tns.push({ title: key, key, ss: 'dfdf', xx: 'ds' })
    if (i < y) {
      children.push(key)
    }
  }
  if (_level < 0) {
    return tns
  }
  const level = _level - 1
  children.forEach((key, index) => {
    tns[index].children = []
    return generateData(level, key, tns[index].children)
  })
}
generateData(z)

function transform (list) {
  if (!list) return
  list.filter(item => {
    item.key = item.id
    item.title = item.name
  })
  let tree = []
  for (let i = 0; i < list.length; i++) {
    for (let j = i; j < list.length; j++) {
      if (list[j].parentId === list[i].id) {
        if (list[i].children === undefined) {
          list[i].children = []
        }
        list[i].children.push(list[j])
      } else if (list[j].id === list[i].parentId) {
        if (list[j].children === undefined) {
          list[j].children = []
        }
        list[j].children.push(list[i])
      }
    }
    if (list[i].parentId === null) {
      tree.push(list[i])
    }
  }
  return tree
}

export default {
  name: 'treeBox',
  data () {
    return {
      gData,
      expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
      treeList: [],
      dropKey: 0
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
        console.log(ar)
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj)
        } else {
          ar.splice(i + 1, 0, dragObj)
        }
      }
      this.treeList = data
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
    }
  }
}
</script>
