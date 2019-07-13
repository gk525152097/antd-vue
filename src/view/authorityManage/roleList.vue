<template>
    <div class="role-list">
      <a-list
        size="small"
        bordered
        :dataSource="roleList"
      >
        <div slot="header" class="list-title">角色</div>
        <a-list-item slot="renderItem" slot-scope="item, index" :class="active === index ? 'active' : null" class="list-item" @click="handleRole(index, item)">
          {{item.role}}
        </a-list-item>
      </a-list>
    </div>
</template>

<script>
export default {
  name: 'roleList',
  mounted () {
    this.$store.dispatch('getRoleList')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  data: () => ({
    active: null
  }),
  computed: {
    roleList () {
      return this.$store.getters.authoritymanage.roleList
    }
  },
  methods: {
    handleRole (index, item) {
      console.log(index, item)
      this.active = index
      this.$store.dispatch('handleRole', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.role-list {
  background: #fff;
  .list-title{
    color: rgba(0, 0, 0, 0.45);
  }
  .list-item {
    cursor: pointer;
    transition: all 0.1s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    &.active {
      background: #40a9ff;
      color: #fff;
    }
  }
}
</style>
