import { model, Schema } from 'mongoose'

const WebModule = model('WebModule', new Schema({
  name: {
    type: String,
    default: ''
  },
  browser_url: {
    type: String,
    default: ''
  },
  image_url: {
    type: String,
    default: ''
  },
  enabled: {
    type: Boolean,
    default: false
  },
  creator_id: {
    type: Schema.ObjectId,
    default: null
  }
}))

export default WebModule
