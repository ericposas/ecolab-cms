import { model, Schema } from 'mongoose'

const CustomModule = model('CustomModule', new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropdups: true
  },
  image_url: {
    type: String,
    required: true
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
