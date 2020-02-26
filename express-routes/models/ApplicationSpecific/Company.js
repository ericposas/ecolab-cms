import { model, Schema } from 'mongoose'

const Company = model('Company', new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropdups: true
  },
  logo_image_url: {
    type: String,
    required: true
  },
  customer_names: {
    type: Array,
    default: []
  },
  notes: {
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
  },
  updated: {
    type: Date,
    default: Date.now
  }
}))

export default Company
