import { defineStore } from "pinia";

export const useUserStore = defineStore('user', () => {
  const accessToken = ref()
  const isLogin = ref(false)
  const loginDialogVisible = ref(false)

  const $reset = () => {
    accessToken.value = null
    isLogin.value = false
  }
  return { accessToken, isLogin, loginDialogVisible, $reset }
}, {
  persist: true
})
