<template>
  <el-dialog :model-value="userStore.loginDialogVisible" :align-center="true" :center="true" @close="closeDialog"
    width="440px" style="border-radius: var(--el-border-radius-round);padding: 20px;">
    <template #header>
      <span v-if="isLogin" style="font-size: 20px;">注册</span>
      <span v-else style="font-size: 20px;">登录</span>
    </template>
    <template #default>
      <el-form :model="formData" label-width="auto" class="form" ref="elFormRef" :rules="formRules">
        <el-form-item v-for="item in showFormItem" :key="item.prop" :prop="item.prop" :label="item.label">
          <el-input v-model.trim="formData[item.prop]" :type="item.type" :placeholder="item.placeholder"
            :show-password="item.showPassword" :clearable="item.clearable"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div v-if="isLogin">
        <span class="pointer" style="color:var(--el-color-danger-dark)" @click="loginOrSign">如有账号，点击登录</span>
        <el-button class="ml-12 ls-button" color="#ff5967" @click="logining" :loading="state.isLoading">{{
          state.isLoading ? '正在注册' : '注册' }}</el-button>
      </div>
      <div v-else>
        <span class="pointer" style="color:var(--el-color-danger-dark)" @click="loginOrSign">没有账号，点击注册</span>
        <el-button class="ml-12 ls-button" color="#ff5967" @click="signing" :loading="state.isLoading">{{
          state.isLoading ? '正在登录' : '登录' }}</el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup>
import { loginFunc, signInFunc } from '@/api/common.js'
import { formItems, formData, formRules, isLogin } from './config.js'
import { useUserStore } from '@/stores/user.js'
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()


const elFormRef = ref(null)

const state = reactive({
  isLoading: false
})

// 避免v-if跟v-for同级使用
const showFormItem = computed(() => {
  return formItems.filter(item => {
    return item.isLogin || isLogin.value
  })
})

const reset = () => {
  Object.keys(formData).map(key => {
    formData[key] = ''
  })
}

const logining = () => {
  elFormRef.value.validate((valid, fields) => {
    if (valid) {
      state.isLoading = true
      const params = {
        account: formData.account,
        pwd: btoa(formData.pwd),
        userName: formData.userName
      }
      loginFunc(params).then((res) => {
        if (res.data.result) {
          userStore.accessToken = res.headers['x-access-token']
          userStore.isLogin = true
          redirectUrl()
          closeDialog()
        } else {
          ElMessage.error(res.data.msg)
        }
      }).finally(() => {
        state.isLoading = false
      })
    }
  })
}

const signing = () => {
  elFormRef.value.validate((valid, fields) => {
    if (valid) {
      state.isLoading = true
      const params = {
        account: formData.account,
        pwd: btoa(formData.pwd)
      }
      signInFunc(params).then(res => {
        if (res.data.result) {
          userStore.accessToken = res.headers['x-access-token']
          userStore.isLogin = true
          redirectUrl()
          closeDialog()
        } else {
          ElMessage.error(res.data.msg)
        }
      }).finally(() => {
        state.isLoading = false
      })
    }
  })
}

const loginOrSign = () => {
  reset()
  isLogin.value = !isLogin.value
}

// 如果路由有redirect，则登录或注册之后重定向
const redirectUrl = () => {
  if (route.query.redirect) {
    let redirectUrlHash = route.query.redirect
    Object.keys(route.query).map(key => {
      // query里面有个"": null键值对，判断时得去除
      redirectUrlHash += (key === 'redirect' | !key) ? '' : '&&' + key + '=' + route.query[key]
    })
    router.push(redirectUrlHash)
  }
}

const closeDialog = () => {
  reset()
  userStore.loginDialogVisible = false
}

</script>

<style lang="less" scoped>
.form {
  :deep(.el-input__wrapper) {
    width: 350px;

    &.is-focus {
      box-shadow: 0 0 0 1px var(--el-color-error-light-5) inset;
    }
  }
}

.ls-button {
  color: #fff;
  border-radius: var(--el-border-radius-big);

  &:active {
    background-color: var(--el-color-danger-dark);
  }
}
</style>
