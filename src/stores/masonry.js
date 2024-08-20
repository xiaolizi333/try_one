import { defineStore } from 'pinia'

export const useMasonryStore = defineStore('masonry', () => {
  const masonryWidth = 240
  const widthClass = 'width-240'
  const gutter = 20
  const fitWidth = 'true'

  return { masonryWidth, widthClass, gutter, fitWidth }
})