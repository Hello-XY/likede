<template>
  <div class="login-container">
    <div class="login-div">
      <img
        src="	http://likede2-admin.itheima.net/img/logo.595745bd.png"
        alt=""
        class="login-logo"
      />
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <!-- <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div> -->

        <el-form-item prop="username">
          <span class="svg-container">
            <i class="el-icon-mobile-phone"></i>
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入账号"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>

        <el-form-item prop="verificationCode">
          <div class="el-row is-justify-space-between el-row--flex">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="verificationCode"
              v-model="loginForm.verificationCode"
              placeholder="请输入验证码"
              name="verificationCode"
              type="text"
              tabindex="1"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <img
              data-v-26affb70=""
              :src="imgCodeUrl"
              class="code-image"
              @click="imageCode"
            />
          </div>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px; height: 52px"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateVerificationCode = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin',
        verificationCode: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        verificationCode: [
          {
            required: true,
            trigger: 'blur',
            validator: validateVerificationCode
          }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  created() {
    /* 获取验证码 */
    this.imageCode()
  },
  methods: {
    ...mapActions('user', ['setClientToken', 'login', 'updataSuccess']),
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleLogin() {
      try {
        this.loading = true
        await this.$refs.loginForm.validate()
        await this.login(this.loginForm)
        if (this.success) {
          this.$router.push('/')
          this.$message.success(this.msg)
        } else {
          this.$message.error(this.msg)
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    /* 获取验证码 */
    imageCode() {
      this.setClientToken(Math.floor(Math.random() * 100))
    }
  },
  computed: {
    ...mapState('user', [
      'clientToken',
      'imgCodeUrl',
      'token',
      'success',
      'msg'
    ])
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #999;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url(http://likede2-admin.itheima.net/img/background.be4fae7d.png);
  background-repeat: no-repeat;
  background-size: cover;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-div {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
    .login-logo {
      position: absolute;
      width: 96px;
      height: 96px;
      top: -46px;
      left: 50%;
      margin-left: -48px;
    }
    .el-form-item {
      width: 100%;
      height: 52px;
      margin-bottom: 24px;
      background: #fff;
      border: 1px solid #e2e2e2;
      border-radius: 4px;
    }
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    // padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .el-button--primary {
    width: 100%;
    height: 52px;
    background: linear-gradient(262deg, #2e50e1, #6878f0);
    opacity: 0.91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
  }
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>
