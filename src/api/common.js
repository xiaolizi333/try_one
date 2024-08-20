import { postFn, getFn } from '@/httpRequest.js'

// 注册接口
export const loginFunc = (params) => {
  return postFn('localhost/login', params)
}

// 登录接口
export const signInFunc = (params) => {
  return postFn('localhost/signIn', params)
}

// 登出接口
export const logoutFunc = () => {
  return getFn('localhost/logout')
}

// 验证是否登录接口
export const isSignIn = () => {
  return getFn('localhost/isSignIn')
}

export const uploadPhotos = (params) => {
  return postFn('localhost/uploadPhoto', params)
}

// 查找分类
export const getClassification = () => {
  return getFn('localhost/getClassification')
}

export const testPostApi = (params) => {
  return postFn('localhost/testPost', params)
}


export const testGetApi = () => {
  return getFn('localhost/testGet?type="测试下get接口是否通畅，记得用res.query接收参数"')
}

