<template>
  <el-popover placement="bottom-end" trigger="hover" :width="240" :show-arrow="false" popper-style="border-radius:20px"
    :teleported="false">
    <template #reference>
      <el-icon class="pointer ml-8 circle-plus" size="24px"><icon-ep-CirclePlusFilled /></el-icon>
    </template>
    <template #default>
      <div class="flex-popover">
        <div class="flex-div pointer" v-for="item in circleFilledConfig" :key="item.key" @click="triggerEvent(item)">
          <i class="iconfont ml-12 mr-12" :class="item.iconClass"></i>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </template>
  </el-popover>
  <upload-collection v-model="state.uploadCollectionVisible" @showUploadPhotos="showUploadPhotos"></upload-collection>
  <create-board v-model="state.createBoardVisible"></create-board>
  <upload-photos v-model="state.uploadPhotosVisible" @showUploadCollection="showUploadCollection"></upload-photos>
</template>

<script setup>
import { circleFilledConfig } from './config.js'

import { uploadCollection, createBoard, uploadPhotos } from './componentElement.js'


const state = reactive({
  circleFilledConfig,
  uploadCollectionVisible: false,
  createBoardVisible: false,
  uploadPhotosVisible: false
})

const triggerEvent = (item) => {
  if (item.link) {
    window.open(item.link, name = item.target)
  } else {
    state[item.visibleName] = true
  }
}
const showUploadPhotos = () => {
  state.uploadPhotosVisible = true
}

const showUploadCollection = () => {
  state.uploadCollectionVisible = true
}

</script>

<style lang="less" scoped>
.circle-plus {

  &:hover {
    background-color: var(--el-color-info-light-8);
    border-radius: var(--el-border-radius-regular);
    transition-duration: var(--el-transition-duration-default);
    transition-property: background-color, border-radius;
  }
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
    }

    .iconfont {
      font-size: 20px;
    }
  }
}
</style>
