import { model, Schema } from 'mongoose'

const WebModule = model('WebModule', new Schema({
  browser_url: {
    type: String,
    required: true,
    unique: true
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

export default WebModule
