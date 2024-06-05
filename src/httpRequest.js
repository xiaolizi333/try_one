import axios from 'axios'
const baseUrl = import.meta.env
const instance = axios.create({
  timeout: 6000,
})

instance.interceptors.request.use(
  resquest => {
    if (localStorage.jwtoken) {
      resquest.headers.Authorization = localStorage.jwtoken
    }
    return resquest
  },
  err => {
    return Promise.reject(err)
  })

instance.interceptors.response.use(
  response => {
    console.log('response======>', response)
    return Promise.resolve(response)
  },
  err => {
    const status = err.response.status
    if (status >= 500) {
      alert('服务器连接失败')
    } else if (status >= 400) {
      alert('页面出错，请稍后再试')
    } else {
      console.log('很好，很成功')
    }
    return Promise.reject(err.response)
  }
)


export const getFn = (url = baseUrl, data) => {
  return instance.get(url, data)
}

export const postFn = (url = baseUrl, data) => {
  return instance.post(url, data)
}
