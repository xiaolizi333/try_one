<template>
  <div class="home-page">
    <navigator class="navigator-header"></navigator>
    <!-- <router-view></router-view> -->
    <router-view v-slot="{ Component }">
      <component :is="Component" v-if="Component" />
    </router-view>
  </div>
</template>

<script setup>

import navigator from './components/navigator.vue';
import { useMasonryStore } from '@/stores/masonry.js'
import { resizeChange } from '@/utils/index.js'

const store = useMasonryStore()

onMounted(() => {
  const { masonryWidth, gutter } = store
  // 瀑布流里面盒子容器总宽度
  const masonryWidthGutter = masonryWidth + gutter
  const homePage = document.getElementsByClassName('home-page')[0]
  const photoPage = document.getElementsByClassName('photo-page')[0]

  // 创建 ResizeObserver 实例，并传入回调函数
  const observer = resizeChange(homePage, photoPage, masonryWidthGutter)
  // 将监听对象放进观察
  observer.observe(homePage);
})

</script>

<style>
@import url(./style/common.less);
</style>

<style lang="less" scoped>
.home-page {
  height: 100vh;
  overflow: auto;

  .navigator-header {
    position: sticky;
    /* sticky必要要设置四个偏移量之一才会生效 */
    top: 0;
    z-index: 1;
    background-color: #fff;
    border-bottom: 1px solid #E4E7ED;
  }
}
</style>