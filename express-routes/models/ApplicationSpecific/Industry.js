import { model, Schema } from 'mongoose'

const Industry = model('Industry', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  parent_division: {
    type: String,
    default: ''
  },
  segments: {
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

export default Industry
