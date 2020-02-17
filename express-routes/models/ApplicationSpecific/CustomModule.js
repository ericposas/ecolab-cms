import { model, Schema } from 'mongoose'

const CustomModule = model('CustomModule', new Schema({
  image_url: {
    type: String,
    default: ''
  },
  enabled: {
    type: Boolean,
    default: true
  },
  creator_id: {
    type: Schema.ObjectId,
    default: null
  }
}))

export default CustomModule
