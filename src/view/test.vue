<template>
  <div class="box" drag @dragenter="dragPhotoEnter" @dragleave="dragPhotoLeave" @drop="dropFunc($event)" @dragover="dragover($event)">
    小测试：人名:{{ state.name }}???
  </div>

  <button @click="btn">继续测试</button>

  <div>{{ state.text }}</div>
  <el-button @click="shishi">试试</el-button>

</template>

<script setup>
import { reactive } from 'vue';


// 全局变量可以这么使用
const app = getCurrentInstance()
const ooo = app.appContext.config.globalProperties.$ooo


const state = reactive({
  name: '小黎子',
  text: '这是？？？'
})
const btn = () => {
  state.name = '真名还是假名？？？'
  console.log(state.name)
  // 复制到粘贴板
  navigator.clipboard.writeText('试试就逝世？？？')
}
const shishi = () => {
  // 将粘贴板的东西粘贴出来
  navigator.clipboard.readText().then(res => {
    state.text = res
  })
}

const dragPhotoEnter = () => {
  console.log('进来了')
}

const dragPhotoLeave = () => {
  console.log('出去了')
}

const dropFunc = (e) => {
  e.preventDefault()
  console.log(666)
}

const dragover = (e) => {
  console.log(999)
  e.preventDefault()
}

</script>


<style lang="less" scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: lightblue;
}



</style>