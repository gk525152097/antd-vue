<template>
  <a-dropdown :placement="'bottomCenter'">
    <a class="ant-dropdown-link" href="#">
      <a-avatar size="small" icon="user" class="user-avatar" /> admin
    </a>
    <a-menu slot="overlay" class="dropdown-contant">
      <a-menu-item>
        <a href="javascript:;"><a-icon type="user" /><span class="dropdown-item">个人中心</span></a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;"><a-icon type="setting" /><span class="dropdown-item">个人设置</span></a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;"><a-icon type="alert" /><span class="dropdown-item">触发错误</span></a>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <a href="javascript:;" @click="logout"><a-icon type="logout" /><span class="dropdown-item">退出登录</span></a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: 'headerMenu',
  methods: {
    logout () {
      localStorage.removeItem('user')
      this.$store.dispatch('ResetMenu', [])
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-avatar {
    margin: -4px 8px 0 0;
  }
  .dropdown-contant {
    margin-top: 22px;
  }
  .dropdown-item {
    display: inline-block;
    padding: 4px 8px;
  }
</style>
