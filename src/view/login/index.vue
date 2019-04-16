<template>
  <div class="login-bg">
    <div class="login-box">
      <a-form :form="form" @submit="handleSubmit">
        <a-tabs defaultActiveKey="1" style="text-align: center" >
          <a-tab-pane tab="用户名密码登录" key="1">
            <a-form-item
              :validate-status="userNameError() ? 'error' : ''"
              :help="userNameError() || ''"
            >
              <a-input
                v-decorator="[ 'userName',  {rules: [{ required: true, message: 'Please input your username!' }]} ]"
                placeholder="用户名"
              >
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item
              :validate-status="passwordError() ? 'error' : ''"
              :help="passwordError() || ''"
            >
              <a-input
                v-decorator="[  'password',  {rules: [{ required: true, message: 'Please input your Password!' }]} ]"
                type="password" placeholder="密码"
              >
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane tab="手机号码登录" key="2" forceRender>
            <a-form-item
              :validate-status="userNameError() ? 'error' : ''"
              :help="userNameError() || ''"
            >
              <a-input
                v-decorator="[ 'phoneNumber',  {rules: [{ required: true, message: 'Please input your username!' }]} ]"
                placeholder="手机号码"
              >
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item
              :validate-status="userNameError() ? 'error' : ''"
              :help="userNameError() || ''"
            >
              <a-input
                v-bind:style="{width: '60%'}"
                v-decorator="[ 'code',  {rules: [{ required: true, message: 'Please input your username!' }]} ]"
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
          <a-button type="primary" style="width: 100%" html-type="submit">
            登录
          </a-button>
          <div class="login-other">
            <span>其他登录方式</span>
            <span class="icon">
              <a-icon type="alipay-circle" />
              <a-icon type="qq" />
              <a-icon type="weibo" />
            </span>
            <a href="#" style="float: right">注册账户</a>
          </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}
export default {
  name: 'index',
  data () {
    return {
      hasErrors,
      form: this.$form.createForm(this),
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields()
    })
  },
  methods: {
    // Only show error after a field is touched.
    userNameError () {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('userName') && getFieldError('userName')
    },
    // Only show error after a field is touched.
    passwordError () {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },
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
                  // todo 替换菜单
                  // 问题 基本菜单未实现
                  console.log(GetMenu.data)
                  this.$router.addRoutes(GetMenu.data[0])
                  this.$router.addRoutes([{ path: '*', redirect: '/404', hidden: true }])
                  this.$router.options.routes.push(GetMenu.data)
                  console.log(this.$router)
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
