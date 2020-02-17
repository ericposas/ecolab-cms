import { model, Schema } from 'mongoose'

const CustomModule = model('CustomModule', new Schema({
  name: {
    type: String,
    default: ''
  },
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
