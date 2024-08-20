<template>
  <el-dialog :model-value="modelValue" @close="closeDialog" width="500px" :align-center="true"
    style="border-radius: var(--el-border-radius-round);padding: 20px;">
    <template #header>
      <div class="header mb-12"><span>上传采集</span></div>
    </template>
    <template #default>
      <el-upload class="upload-photo" :class="[state.isdragenter ? 'drag' : '']"
        v-model:file-list="upPhotosStore.fileList" drag multiple action="#" :show-file-list="false" list-type="picture"
        :http-request="handleUploadPhoto" @dragenter="dragPhotoEnter" @dragleave="dragPhotoLeave">
        <div class="dragenter" v-if="state.isdragenter">
          <el-image class="photo-folder" :src="photoFolder"></el-image>
          <p class="release-tips mt-20">松开上传</p>
        </div>
        <div class="dragleave" v-else>
          <el-image class="image-photos mb-20" :src="imagePhotos"></el-image>
          <div class="upload-text">
            <span>拖拽图片到这里，或</span><span class="highlight">点此添加</span>
          </div>
          <div class="upload-tips mt-12 mb-12">
            每次最多上传40张，单张图片体积不超过20MB
          </div>
        </div>
      </el-upload>
    </template>
    <template #footer>
      <div class="desktop-upload mb-8 pointer" @click="openDesktopSide">
        <el-image class="file-upload ml-8 mr-8" :src="fileUpload"></el-image>
        <div style="display: flex;flex-direction: column;align-items:flex-start;width: 75%;">
          <span style="font-weight: bold;">去桌面端上传</span>
          <span class="mt-8"
            style="font-size: x-small;font-weight: lighter;color: var(--el-text-color-regular);">支持拖拽文件上传，单词上传不限数量</span>
        </div>
        <el-icon style="font-size: x-large;"><icon-ep-TopRight /></el-icon>
      </div>
    </template>
  </el-dialog>

</template>


<script setup>
import imagePhotos from '@/assets/photos.png'
import fileUpload from '@/assets/fileUpload.png'
import photoFolder from '@/assets/photoFolder.png'
import { useUploadPhotosStore } from '@/stores/uploadPhotos.js'

const upPhotosStore = useUploadPhotosStore()

defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'showUploadPhotos'])
let lastEnterNode = ''

const state = reactive({
  isdragenter: false
})

const handleUploadPhoto = () => {
  // const reader = new FileReader();
  // reader.readAsArrayBuffer(upPhotosStore.fileList[0].raw);
  // console.log(reader)

  closeDialog()
  emit('showUploadPhotos')
}

/*  记住最后一个dragenter的元素，因为进入其内部元素时，会先dragenter内部元素，紧接着dragleave外层元素
    只要dragleave的元素和最后一个dragenter的元素相同即可*/
const dragPhotoEnter = (e) => {
  lastEnterNode = e.target
  state.isdragenter = true
}
const dragPhotoLeave = (e) => {
  if (e.target === lastEnterNode) {
    state.isdragenter = false
  }
}

const closeDialog = () => {
  state.isdragenter = false
  emit('update:modelValue', false)
}

const openDesktopSide = () => {
  window.open('https://www.gaoding.com/pro?hmsr=hbld-hbld-pro-hbld-tuwen-huaban-bdqd&utm_medium=hb&utm_source=hbld', name = '_blank')
}

</script>

<style lang="less" scoped>
.header {
  text-align: center;
  font-size: 20px;
}

.upload-photo {
  &.drag {
    :deep(.el-upload-dragger) {
      background-color: #fcf2f6;
      border: 2px dashed var(--el-border-color-darker);
      transition-duration: 0;
      transition-property: background-color, border;
    }
  }

  :deep(.el-upload-dragger) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 240px;
    /* pointer-events:none;的时候这样drag进去遇到子元素则不会触发事件，但不触发也会有问题*/


    border-radius: var(--el-border-radius-big);
    background-color: var(--el-fill-color);
    border: 2px dashed var(--el-border-color);
    transition-duration: var(--el-transition-duration);
    transition-property: background-color, border;

    &:hover {
      background-color: var(--el-color-primary-light-9);
      border: 2px dashed var(--el-border-color-darker);
      transition-duration: var(--el-transition-duration);
      transition-property: background-color, border;
    }

    .dragenter {
      color: var(--el-text-color-primary);

      .photo-folder {
        width: 76px;
      }

      .release-tips {
        font-weight: bold;
      }
    }

    .image-photos {
      width: 120px;
    }

    .upload-text {
      color: var(--el-text-color-primary);
      font-size: 14px;
      font-weight: bold;

      .highlight {
        color: var(--el-color-danger-dark);
        text-decoration: underline;
      }
    }

    .upload-tips {
      font-weight: lighter;
      font-size: 12px;
      color: var(--el-text-color-regular);
    }
  }


}

.desktop-upload {
  display: flex;
  align-items: center;
  color: var(--el-text-color-primary);
  background-color: var(--el-color-primary-light-9);
  border-radius: var(--el-border-radius-big);
  transition-duration: var(--el-transition-duration);
  transition-property: background-color;

  &:hover {
    background-color: var(--el-color-primary-light-8);
    transition-duration: var(--el-transition-duration);
    transition-property: background-color;
  }

  .file-upload {
    width: 64px;
  }
}
</style>
