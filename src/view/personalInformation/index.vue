<template>
  <div>这是个人中心</div>
</template>

<script setup>
import { isSignIn } from '@/api/common.js';

onBeforeMount(() => {
  isSignIn()
})
</script>

<style lang="less" scoped></style>