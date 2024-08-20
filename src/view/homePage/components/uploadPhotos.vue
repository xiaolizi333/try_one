<template>
  <el-dialog :model-value="modelValue" @open="openDialog" @close="closeDialog" :align-center="true" width="730px"
    style="border-radius: var(--el-border-radius-round);padding: 20px;">
    <div class="flex-box">
      <div class="photo-detail mr-20">
        <el-image class="preview-photo brr shrink0" fit="cover" :src="state.src"
          :preview-src-list="[state.src]"></el-image>
        <textarea class="photo-discription brr mt-12 scrollbarNone" v-model="state.discription"
          placeholder="为作品添加描述"></textarea>
        <select-tags class="mt-12" ref="selectTagsRef" :options="state.tagsOptions"></select-tags>
        <select-textarea class="mt-12 brr" v-if="modelValue" placeholder="添加提示词Prompt"
          :options="state.drawingAIOptions"></select-textarea>
      </div>
      <div class="upload-area">
        <div class="header"><span>上传采集</span></div>
        <div class="attribute-classify mt-12">
          <el-cascader v-model="state.boardValue" class="board" placeholder="画板" :options="state.boardOption" />
          <el-cascader v-model="state.classificationValue" class="classification ml-12" placeholder="分类"
            :options="state.classificationOption" />
        </div>
        <div class="photos-display mt-12">
          <div class="image-case">
            <div class="image-box brr" v-for="(item, index) in upPhotosStore.fileList" :key="index"
              :class="[index === state.photoFocus ? 'isFocus' : '', item.name ? 'pointer' : '']"
              @click="changeFocus(index, item)" @mouseenter="mouseenter(index)" @mouseleave="mouseleave">
              <transition name="el-fade-in-linear">
                <div class="close-button pointer" v-show="state.photoHover === index | state.photoFocus === index"
                  @click.stop="deletePhotos(index)">
                  <el-icon><icon-ep-Close /></el-icon>
                </div>
              </transition>
              <el-image class="image-photo brr" fit="cover" :src="item.url" lazy></el-image>
            </div>
          </div>
          <div class="hold-case">
            <div v-for="item in upPhotosStore.limitOfPhotos" class="hold-box brr"></div>
          </div>
        </div>
        <el-upload class="upload-photo mt-12" :class="[state.isdragenter ? 'drag' : '']"
          v-model:file-list="upPhotosStore.fileList" drag multiple action="#" :show-file-list="false"
          list-type="picture" :auto-upload="false" :on-change="changeFileList" @dragenter="dragPhotoEnter"
          @dragleave="dragPhotoLeave">
          <div class="dragenter" v-if="state.isdragenter">
            <p class="release-tips">松开上传</p>
          </div>
          <div class="dragleave" v-else>
            <div class="upload-text">
              <span>拖拽图片到这里，或</span><span class="highlight">点此添加</span>
            </div>
          </div>
          <div class="upload-tips mt-12">
            已选{{ upPhotosStore.fileList.length }}张，还可选{{ upPhotosStore.limitOfPhotos - upPhotosStore.fileList.length }}张
          </div>
        </el-upload>
        <div class="buttons mt-12">
          <el-button color="#edf2f5" class="cc-button">取消</el-button>
          <el-button color="#f56c6c" class="cc-button confirm">确定</el-button>
        </div>
      </div>

    </div>
  </el-dialog>

</template>

<script setup>
import { useUploadPhotosStore } from '@/stores/uploadPhotos.js'
import { getClassification } from '@/api/common.js'
import { selectTags, selectTextarea } from './componentElement.js'
const upPhotosStore = useUploadPhotosStore()

let lastEnterNode = ''
defineProps(['modelValue'])

const emit = defineEmits(['update:modelValue', 'showUploadCollection'])
const selectTagsRef = ref('')

const drawingAIOptions = [
  { label: 'Midjourney', value: 'Midjourney' },
  { label: 'Lexica', value: 'Lexica' },
  { label: 'DALL-E', value: 'DALL-E' },
  { label: 'Stable-Diffusion', value: 'Stable-Diffusion' },
  { label: 'others', value: 'others' },
]

const state = reactive({
  src: '',
  fileList: [],
  discription: '',
  tagsOptions: [],
  drawingAIOptions,
  photoFocus: 0,
  photoHover: 0,
  boardValue: '',
  classificationValue: '',
  boardOption: [],
  classificationOption: [],
  isdragenter: false,
})

const changeFocus = (index, item) => {
  state.photoFocus = index
  state.src = item.url
  console.log(item)
}

const changeFileList = () => {
  state.isdragenter = false
}

const mouseenter = (index) => {
  state.photoHover = index
}

const mouseleave = () => {
  state.photoHover = state.photoFocus
}

const deletePhotos = (index) => {
  upPhotosStore.fileList.splice(index, 1)
  if (index <= state.photoFocus) {
    state.photoFocus = state.photoFocus - 1
  }
  if (upPhotosStore.fileList.length) {
    state.src = upPhotosStore.fileList[state.photoFocus].url
  } else {
    closeDialog()
    emit('showUploadCollection')
  }
}

const dragPhotoEnter = (e) => {
  lastEnterNode = e.target
  state.isdragenter = true

}
const dragPhotoLeave = (e) => {
  if (e.target === lastEnterNode) {
    state.isdragenter = false
  }
}

const openDialog = () => {
  upPhotosStore.fileList = upPhotosStore.fileList.slice(0, upPhotosStore.limitOfPhotos)
  state.photoFocus = 0
  state.src = upPhotosStore.fileList[0].url
  selectTagsRef.value?.reset()
}

const closeDialog = () => {
  upPhotosStore.$reset()
  emit('update:modelValue', false)
}

onBeforeMount(() => {
  state.tagsOptions = [
    {
      value: '线稿',
      label: '线稿'
    },
    {
      value: '入坟',
      label: '入坟'
    },
    {
      value: '要命',
      label: '要命'
    },
    {
      value: '薄纱',
      label: '薄纱'
    }
  ]
})

onMounted(() => {
  getClassification().then(res => {
    state.classificationOption = res.data
  })
})

</script>

<style lang="less" scoped>
@import url('../style/uploadPhotos.less');
</style>