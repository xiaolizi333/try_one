<template>
  <div>
    <input type="text" v-model="inputValue" @input="aaa">
    <br>
    <input type="text" v-model="yaolaoming" @input="bbb">

    <p>vaule值：{{ inputValue }}</p>
    <p>yaolaoming值：{{ yaolaoming }}</p>

    <button>按钮</button>
    <br>
    <button class="test-button">测试按钮</button>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { throttled, debounce } from '@/utils'
// import { getFn } from '@/httpRequest.js'
const inputValue = ref('')
const yaolaoming = ref('')




const aaa = throttled(() => console.log(inputValue.value), 5000)
const bbb = debounce(() => console.log(yaolaoming.value), 2000)

// getFn('api').then(res => {
//   // console.log('res====>',res)
//   // console.log(import.meta.env.VITE_APP_URL)
//   // console.log(window.localStorage)
// }).catch(err => {
//   console.log('err=======>',err)
// })
</script>

<style>
.test-button {
  margin: auto;
  display: block;
  outline: 2px dotted lightpink;
}
</style>
