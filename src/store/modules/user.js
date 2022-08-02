import { getImageCode, login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    /* 验证码图片的token */
    clientToken: '',
    /* 验证码链接 */
    imgCodeUrl: '',
    /* 登录后的用户token */
    token: '',
    /* 判断登录状态 */
    success: '',
    /* 登录消息提示 */
    msg: ''
  },
  mutations: {
    /* 获取验证码 */
    setClientToken(state, payload) {
      state.clientToken = payload
      state.imgCodeUrl = `http://localhost:9528/api/user-service/user/imageCode/${payload}`
    },
    /* 登录 */
    login(state, payload) {
      state.token = payload.token
      state.success = payload.success
      state.msg = payload.msg
    }
  },
  actions: {
    /* 获取验证码 */
    async setClientToken(context, payload) {
      try {
        await getImageCode(payload)
        context.commit('setClientToken', payload)
      } catch (error) {
        console.log(error)
      }
    },
    /* 登录 */
    async login(context, payload) {
      try {
        const res = await login(
          payload.username,
          payload.password,
          payload.verificationCode,
          context.state.clientToken,
          0
        )
        console.log(res.data)
        context.commit('login', res.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
