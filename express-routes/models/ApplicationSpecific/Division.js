import { model, Schema } from 'mongoose'

const Division = model('Division', new Schema({
  name: {
    type: String,
    default: ''
  },
  industries: {
    type: Array,
    default: []
  },
  tablet_thumb_url: {
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

export default Division
