import axios from 'axios'
import { useUserStore } from '@/stores/user.js'
import { useRoute, useRouter } from 'vue-router'

const baseUrl = import.meta.env

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const instance = axios.create({
  timeout: 6000,
})

const handle401 = () => {
  userStore.$reset()
  window.location.hash = '/?redirect=' + window.location.hash.slice(1,)
  userStore.loginDialogVisible = true
}

instance.interceptors.request.use(
  request => {
    if (userStore.accessToken) {
      request.headers['x-access-token'] = userStore.accessToken
    }
    return request
  },
  err => {
    return Promise.reject(err)
  })

instance.interceptors.response.use(
  response => {
    if (response.headers['x-access-token']) {
      userStore.accessToken = response.headers['x-access-token']
      userStore.isLogin = true
    }
    return Promise.resolve(response)
  },
  err => {
    const status = err.response.status
    if (status >= 500) {
      alert('服务器连接失败')
    } else if (status === 401) {
      //长token失效或本来就是未登录，重新登录
      handle401()
    } else if (status === 402) {
      alert('报错，老登')
    } else if (status >= 400) {
      alert('页面出错，请稍后再试')
    } else {
      alert('母鸡犯了什么天条')
    }
    return Promise.reject(err.response)
  }
)


export const getFn = (url = baseUrl) => {
  return instance.get(url)
}

export const postFn = (url = baseUrl, data) => {
  return instance.post(url, data)
}
