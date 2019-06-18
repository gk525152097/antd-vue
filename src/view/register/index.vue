<template>
  <div class="register-box">
    <div>注册</div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item>
        <a-input
          v-decorator="[ 'username', { rules: [{ required: true, message: '请输入用户名!',}] }]"
          placeholder="账号"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[  'password', { rules: [{ required: true, message: '请输入密码!' }]} ]"
          type="password" placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[  'passwordConfine', { rules: [{ required: true, message: '请输入确认密码!' }]} ]"
          type="password" placeholder="确认密码"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input-group compact style="display: flex">
          <a-select style="width: 80px" defaultValue="+86">
            <a-select-option value="+86">+86</a-select-option>
            <a-select-option value="+87">+87</a-select-option>
          </a-select>
          <a-input
            style="flex: 1"
            v-decorator="[  'phone',  {rules: [{ required: true, message: '请输入手机号码!' }]} ]"
            placeholder="手机号码"
          >
            <a-icon slot="prefix" type="phone" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-input-group>
      </a-form-item>
      <a-form-item>
        <a-input
          v-bind:style="{width: '60%'}"
          v-decorator="[ 'code',  {rules: [{ required: true, message: '请输入验证码!' }]} ]"
          placeholder="验证码"
        />
        <a-button style="float: right; width: 40%; margin: 4px 0 0 0;" html-type="submit">获取验证码</a-button>
      </a-form-item>
      <div class="login-other">
        <a-button type="primary" style="width: 36%" html-type="submit">注册</a-button>
        <router-link to='login'><a href="#" style="float: right">使用已有账户登录</a></router-link>
      </div>
    </a-form>
  </div>
</template>

<script>
import { register } from '@/api/user'
import { message } from 'ant-design-vue'
export default {
  name: 'index',
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          register(values)
            .then((res) => {
              console.log(res)
              if (res.code === 200) {
                message.success(res.message)
              }
              this.$router.push({path: '/login'})
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.register-box{
  width: 380px;
  margin: 0 auto;
}
</style>
