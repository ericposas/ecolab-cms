import { model, Schema } from 'mongoose'

const Company = model('Company', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  logo_image_url: {
    type: String,
    // required: true
  },
  enabled: {
    type: Boolean,
    default: true
  },
  customer_names: {
    type: Array,
    default: []
  },
  notes: {
    type: String,
    default: ''
  },
  min_image_file_size: {
    type: String,
    default: ''
  },
  accepted_file_types: {
    type: Array,
    default: []
  },
  creator_id: {
    type: Schema.ObjectId,
    default: null
  },
  updated: {
    type: Date,
    default: Date.now
  }
}))

export default Company
