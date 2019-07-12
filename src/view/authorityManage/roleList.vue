<template>
    <div class="role-list">
      <a-list
        size="small"
        bordered
        :dataSource="roleList"
      >
        <div slot="header">角色</div>
        <a-list-item slot="renderItem" slot-scope="item, index" class="list-item" @click="handleRole(item)">
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
    data: [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.'
    ]
  }),
  computed: {
    roleList () {
      return this.$store.getters.authoritymanage.roleList
    }
  },
  methods: {
    handleRole (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.role-list {
  background: #fff;
  .list-item {
    cursor: pointer;
    transition: all 0.1s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
