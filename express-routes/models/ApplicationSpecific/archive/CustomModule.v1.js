import { model, Schema } from 'mongoose'

const CustomModule = model('CustomModule', new Schema({
  headline: {
    type: String,
    default: ''
  },
  copy: {
    type: String,
    default: ''
  },
  image_url: {
    type: String,
    default: ''
  },
  template_id: {
    type: Schema.ObjectId,
    default: null
  },
  enabled: {
    type: Boolean,
    default: true
  },
  creator_id: {
    type: Schema.ObjectId,
    default: null
  },
  rendered_png_url: {
    type: String,
    default: ''
  }
  
}))

export default CustomModule
