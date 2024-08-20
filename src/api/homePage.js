import { postFn } from '@/httpRequest.js'

export const getPhotoPageData = (params) => {
  return postFn('localhost/photoPageData', params)
}
