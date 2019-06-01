import { IMAGEURL } from '../constants/index'

const getImageUrl = suffix => `http://${IMAGEURL}${suffix}`
const getImageUrlSecure = suffix => `https://${IMAGEURL}${suffix}`

export {
  getImageUrl,
  getImageUrlSecure
}
