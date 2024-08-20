import { defineStore } from "pinia";

export const useUploadPhotosStore = defineStore('uploadPhotos', () => {
  const limitOfPhotos = 40
  const fileList = ref([])
  const getFiles = computed(() => fileList)
  const $reset = () => {
    fileList.value = []
  }
  return { limitOfPhotos, fileList, getFiles, $reset }
})
