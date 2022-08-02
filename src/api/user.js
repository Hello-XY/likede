import request from '@/utils/request'

/**
 * 获取验证码接口
 * @param {*} clientToken 
 * @returns promise
 */
export const getImageCode = (clientToken) => {
  return request({
    url: `/user-service/user/imageCode/${clientToken}`
  })
}

/**
 * 登录接口
 * @returns 
 */
export const login = (loginName,password,code,clientToken,loginType) => {
  return request({
    method: 'POST',
    url: '/user-service/user/login',
    data: {
      loginName,password,code,clientToken,loginType
    }
  })
}