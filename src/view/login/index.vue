<template>
  <div class="login-bg">
    <div class="login-box">
      <a-form :form="form" @submit="handleSubmit">
        <a-tabs defaultActiveKey="1" v-bind:tabBarStyle="{'text-align': 'center'}"  >
          <a-tab-pane tab="用户名密码登录" key="1">
            <a-form-item>
              <a-input
                v-decorator="[ 'userName',  {rules: [{ required: true, message: '请输入用户名!' }]} ]"
                placeholder="用户名"
              >
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[  'password',  {rules: [{ required: true, message: '请输入密码!' }]} ]"
                type="password" placeholder="密码"
              >
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane tab="手机号码登录" key="2" forceRender>
            <a-form-item>
              <a-input
                v-decorator="[ 'phoneNumber',  {rules: [{ required: this.formRequired !== 'account', message: '请输入手机号码!' }]} ]"
                placeholder="手机号码"
              >
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-bind:style="{width: '60%'}"
                v-decorator="[ 'code',  {rules: [{ required: this.formRequired !== 'account', message: '请输入验证码!' }]} ]"
                placeholder="验证码"
              >
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
              </a-input>
              <a-button style="float: right; width: 40%; margin: 4px 0 0 0;" html-type="submit">
                获取验证码
              </a-button>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
          <div class="login-other">
            <a-checkbox :checked="true">自动登录</a-checkbox>
            <a href="#" style="float: right">忘记密码</a>
          </div>
          <a-button type="primary" style="width: 100%" html-type="submit">登录</a-button>
          <div class="login-other">
            <span>其他登录方式</span>
            <span class="icon">
              <a-icon type="alipay-circle" />
              <a-icon type="qq" />
              <a-icon type="weibo" />
            </span>
            <router-link to='register'><a href="#" style="float: right">注册账户</a></router-link>
          </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import baseLayout from '@/view/layout/baseLayout'

function buildRoutes (menuList) {
  menuList = menuList.map(menu => {
    if (menu.children) {
      menu.children = buildRoutes(menu.children)
    }
    if (menu.component.length === 0) {
      delete menu.component
    } else if (menu.component === 'baseLayout') {
      menu.component = baseLayout
    } else {
      menu.component = (_ => () => import('@/view' + _))(menu.component)
    }
    return menu
  })
  return menuList
}
export default {
  name: 'index',
  data () {
    return {
      formRequired: 'account',
      form: this.$form.createForm(this)
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    handleSubmit  (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('Login', values)
            .then(Login => {
              console.log(Login)
              // 拉取角色菜单
              this.$store.dispatch('GetMenu', {role: Login.data.role})
                .then(GetMenu => {
                  // 动态添加路由
                  this.$router.addRoutes(buildRoutes(GetMenu.data))
                  // todo 需要做动态的菜单 因为路由更新 但是菜单没更新
                  // 所以需要使用store来存一个动态的菜单 并在菜单组件中使用
                  // 当store里菜单属性修改时 菜单组件能够动态修改
                  // 存储权限
                  localStorage.setItem('role', Login.data.role)
                  // 跳转
                  this.$router.push({path: '/'})
                })
                .catch((err) => {
                  message.error(`网络请求失败:${err}`)
                })
            })
            .catch((err) => {
              message.error(`网络请求失败:${err}`)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .login-box{
    width: 380px;
    margin: 0 auto;
    .login-other{
      margin: 16px 0;
      line-height: 24px;
     .icon{
       font-size: 24px;
       color: rgba(0, 0, 0, 0.2);
       vertical-align: -webkit-baseline-middle;
       .anticon {
         margin-left: 8px;
         font-size: 24px;
         cursor: pointer;
         transition: all 0.3s;
       }
       .anticon:hover{
         color: #1890ff;
       }
     }
    }
  }
</style>
