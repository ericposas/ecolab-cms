import { model, Schema } from 'mongoose'

const Offering = model('Offering', new Schema({
  name: {
    type: String,
    default: ''
  },
  segment_ids: {
    type: Array,
    default: []
  },
  browser_url: {
    type: String,
    default: ''
  },
  tablet_thumb_url: {
    type: String,
    default: ''
  },
  home_screen_thumb_url: {
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

export default Offering
