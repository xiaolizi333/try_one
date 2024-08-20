<template>
  <div class="photo-page mt-20" v-infinite-scroll="load" :infinite-scroll-immediate="state.infinite.immediate"
    :infinite-scroll-distance="state.infinite.distance">
    <div v-masonry class="masonry-page" :gutter="store.gutter" :fit-width="store.fitWidth" column-width=".photo-card"
      item-selector=".photo-card">
      <photoCard v-masonry-tile class="photo-card mb-20" v-for="item in state.photoArray" :key="item.pinId"
        :src="spliceUrl(item)"></photoCard>
    </div>
  </div>

</template>

<script setup>
import photoCard from '@/components/photoCard.vue';
import { useMasonryStore } from '@/stores/masonry.js'
import { getPhotoPageData } from '@/api/homePage.js'
import { useRoute } from 'vue-router';

const route = useRoute()

// 图片网址分辨率，种类：_fw658webp、_fw480webp、_fw240webp或者直接不用这个后缀
const previewPhotoPixels = '_fw480webp'
const store = useMasonryStore()
const props = defineProps({
  type: {
    type: String,
    default: ''
  }
})

const state = reactive({
  infinite: {
    immediate: 'false', // 是否立即执行加载方法，以防初始状态下内容无法撑满容器
    distance: '1000',     // 触发加载的距离阈值，单位为px
  },
  photoArray: [],
  num: 1,
  size: 40,
  type: ''
})

const spliceUrl = (item) => {
  return 'https://' + item.bucket + '.huaban.com/' + item.key + previewPhotoPixels
}

const getPhotoData = () => {
  const params = {
    num: state.num,
    size: state.size,
    type: state.type,
  }
  getPhotoPageData(params).then(res => {
    state.photoArray = [...state.photoArray, ...res.data.data]
    state.num++
  })
}

const load = () => {
  nextTick(() => {
    if (state.photoArray.length) {
      getPhotoData()
    }
  })
}

onBeforeMount(() => {
  if (!props.type) {
    state.type = route.name
  } else {
    state.type = props.type
  }
  getPhotoData()
})

onUnmounted(() => {
  state.photoArray = []
  state.num = 1
  state.size = 40
  state.type = ''
})

</script>

<style lang="less" scoped>
.photo-page {
  margin: 0 auto;
  min-width: 780px;
  max-width: 2080px;

  .masonry-page {
    margin: 0 auto;
  }
}
</style>