<template>
  <div class="navigator-bar">
    <el-image class="logo mr-12 pointer shrink0" :src="state.huabanLogo" />
    <a class="tab-pane pointer shrink0" v-for="(item, index) in Object.values(navigatorClaasify)" :key="item.name"
      :name="item.name" :class="[item.name === route.name ? 'tab-focus' : 'tab-no-focus']"
      @click="classifyFocus(index, item)">{{
        item.label }}</a>
    <input-search @updateInputValue="updateInputValue"></input-search>
    <el-button class="ml-12 ChatDotSquare" color="#faecd8">
      <el-icon color="#d29d70"><icon-ep-ChatDotSquare /></el-icon>
      <a :href="state.companyMaterialConsultingLink" target="_blank">企业素材咨询</a>
    </el-button>
    <circle-filled-func></circle-filled-func>
    <el-icon class="pointer ml-20" size="24px"><icon-ep-Menu /></el-icon>
    <avatar-func v-if="userStore.isLogin"></avatar-func>
    <el-button v-else class="ml-12 login" size="large" color="#ff5967" round @click="showLoginCom">登录/注册</el-button>
    <!-- <el-button class="ml-12" @click="console.log(userStore.isLogin, userStore.accessToken)">yaoming</el-button> -->
    <el-button class="ml-12" @click="qingqiutest" type="primary" round>测试下</el-button>
    <login-com v-model="userStore.loginDialogVisible"></login-com>
  </div>

</template>

<script setup>
import huabanLogo from '@/assets/huabanLogo.png'
import loginCom from '@/components/login.vue'
import { navigatorClaasify } from './config.js'
import { inputSearch, circleFilledFunc, avatarFunc } from './componentElement.js'
import { useUserStore } from '@/stores/user.js'
import { testPostApi, testGetApi, isSignIn } from '@/api/common.js'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()


const qingqiutest = () => {
  // const params = {
  //   favorite: 'girl',
  //   hate: 'no money'
  // }
  // testPostApi(params).then(res => {
  //   console.log('testPost:', res)
  // })
  // testGetApi().then(res => {
  //   console.log('testGet:', res)
  // })
  isSignIn().then(res => {
    console.log('登进来了')
  })
}

const userStore = useUserStore()

const state = reactive({
  companyMaterialConsultingLink: 'https://huaban.com/vip/consult?leads_entrance=k4kFa5ftm&source=uS2gcaCak',
  huabanLogo,
  inputValue: '',
})


const updateInputValue = () => {
  console.log('来了来了')
}

const showLoginCom = () => {
  userStore.loginDialogVisible = true
}

const classifyFocus = (index, item) => {
  if (!item.address) {
    router.push(item.name)
  } else {
    window.open(item.address, name = item.target)
  }
}

</script>


<style lang="less" scoped>
.navigator-bar {
  display: flex;
  padding: 12px 24px;
  align-items: center;
  min-width: 960px;

  .logo {
    width: 24px;
    height: 24px;
  }

  .tab-pane {
    margin: 0 12px;
    font-weight: bold;
    color: gray;

    &:hover {
      color: var(--el-text-color-regular);
    }

    &:active {
      color: var(--el-color-danger-dark)
    }
  }

  .tab-focus {
    color: var(--el-text-color-primary);

    &:hover {
      color: var(--el-text-color-primary);
    }
  }

  .ChatDotSquare {
    color: #d29d70;

    &:active {
      background-color: #ffead8;
      border-color: #ffead8;
    }

    .el-icon {
      margin-right: 4px;
      width: 16px;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  .login {
    color: #fff;

    &:active {
      background-color: #f64c5b;
    }
  }
}
</style>