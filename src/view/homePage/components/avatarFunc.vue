<template>
  <el-popover placement="bottom-end" trigger="hover" :width="240" :show-arrow="false" popper-style="border-radius:20px"
    :teleported="false">
    <template #reference>
      <div class="pointer ml-12" @click="router.push('personal-information')">
        <el-avatar size="small"><el-icon><icon-ep-UserFilled /></el-icon></el-avatar>
      </div>
    </template>
    <template #default>
      <div class="flex-popover">
        <div class="flex-div pointer" @click="logout">
          <el-icon class="ml-12 mr-12 switch-button"><icon-ep-SwitchButton /></el-icon>
          <span>退出登录</span>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router'
import { logoutFunc } from '@/api/common.js'

const userStore = useUserStore()
const router = useRouter()
const logout = () => {
  ElMessageBox({
    title: '请确定是否退出登录',
    message: '',
    center: true,
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    customClass: 'confirm-box',
    cancelButtonClass: 'cancel-button',
    confirmButtonClass: 'confirm-button',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = '正在退出...'
        logoutFunc().then(res => {
          if (res.data.code === 200) {
            userStore.$reset()
            window.location.reload()
          }
        }).finally(() => {
          // 关闭弹窗
          done()
        })
      }
      else {
        done()
      }
    }
  }).then((action) => { })
}

</script>

<style lang="less" scoped>
.confirm-box {
  padding: 20px
}

.flex-popover {
  display: flex;
  flex-direction: column;

  .flex-div {
    display: flex;
    align-items: center;
    height: 48px;

    &:hover {
      border-radius: var(--el-border-radius-big);
      background-color: var(--el-bg-color-page);
      color: var(--el-color-danger-dark);
    }

    .switch-button {
      font-size: 20px;
      transform: rotate(90deg);
    }
  }
}
</style>
