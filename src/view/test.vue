<template>
  <div class="box">
    小测试：人名:{{ state.name }}???
  </div>
  <button @click="btn">继续测试</button>

</template>

<script setup>
import { reactive, defineProps, getCurrentInstance, ref } from 'vue';

// 全局变量可以这么使用
const app = getCurrentInstance()
const ooo = app.appContext.config.globalProperties.$ooo

const state = reactive({
  name: '小黎子'
})
const btn = () => {
  state.name = '真名还是假名？？？'
  console.log(state.name)
  console.log(ooo)
}


</script>
