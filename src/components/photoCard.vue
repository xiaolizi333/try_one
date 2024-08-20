<template>
  <div class="image-container">
    <img class="image pointer" :class="store.widthClass" :src="props.src">
  </div>
</template>

<script setup>

import { useMasonryStore } from '@/stores/masonry.js'

const store = useMasonryStore()
const props = defineProps({
  src: String
})

</script>


<style lang="less" scoped>
.image-container {

  .image {
    display: block;
    border: 1px solid #DCDFE6;
    border-radius: var(--el-border-radius-big);
    background-color: #dfdfdf;
    background-image: linear-gradient(to top right, #d4d4d4 25%, transparent 0, transparent 75%, #d4d4d4 0, #d4d4d4);
  }


  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: var(--el-border-radius-big);
    background-image: radial-gradient(circle farthest-corner, rgb(80 80 80 / 20%) 20%, rgb(60 60 60 / 25%) 40%, rgb(40 40 40 / 30%) 60%, rgb(20 20 20 / 35%) 80%, rgb(0 0 0 / 40%));
    opacity: 0;
    transition-duration: var(--el-transition-duration-default);
    transition-property: opacity;
  }

  &:hover {
    cursor: zoom-in;

    &::before {
      opacity: 1;
      transition-duration: var(--el-transition-duration-default);
    }
  }
}
</style>
