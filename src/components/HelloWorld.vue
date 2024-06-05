<template>
  <h1>Vite + Vue</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  <div class="box">
    <span v-for="item in routeTest" :key="item.name" :class="item.class" @click="jump(item)">{{ item.name }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { routeTest } from './index.js'
import { mainUrl } from '@/config.js'
const count = ref(0)
const jump = (item) => {
  window.open(mainUrl + item.path, name=`${item.target}`)
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}

div.box span {
  display: inline-block;
  padding: 0 8px;
  cursor: pointer;
  color: lightcoral;
}

span.left {
  border-left: 1px solid lightgrey;
}
</style>
