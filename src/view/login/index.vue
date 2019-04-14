<template>
  <div class="login-bg">
    <div class="login-left">
      <div class="login-box">
        <h1>antd-vue-GK</h1>
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item label="User" v-bind="formItemLayout" :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
            <a-input v-decorator="[ 'userName',  {rules: [{ required: true, message: 'Please input your username!' }]} ]" placeholder="Username">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item label="Password" v-bind="formItemLayout" :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
            <a-input v-decorator="[  'password',  {rules: [{ required: true, message: 'Please input your Password!' }]} ]" type="password" placeholder="Password">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item label=" " v-bind="formItemLayout">
            <a-button type="primary" style="float: right" html-type="submit" :disabled="hasErrors(form.getFieldsError())">Log in</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="login-right"></div>
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
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 }
        }
      }
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
  .login-bg{
    width: 100%;
    height: 100%;
    display: flex;
    .login-left {
      width: 38.2%;
      height: 100%;
      display: flex;
      align-items: center;
      .login-box {
        margin: 0 auto;
        width: 61.8%;
        height: 61.8%;
        border: 1px solid #ccc;
        h1 {
          text-align: center;
          font-size: px2rem(60);
        }
      }
    }
    .login-right {
      flex: 1;
      height: 100%;
      background: url("../../assets/login-bg.jpg");
      background-size: 100% 100%;
    }
  }
</style>
