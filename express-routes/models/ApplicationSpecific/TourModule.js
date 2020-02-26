import { model, Schema } from 'mongoose'

const TourModule = model('TourModule', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  enabled: {
    type: Boolean,
    default: true
  },
  creator_id: {
    type: Schema.ObjectId,
    default: null
  },
  company_id: {
    type: Schema.ObjectId,
    default: null
  },
  company_name: {
    type: String,
    default: ''
  },
  division_id: {
    type: Schema.ObjectId,
    default: null
  },
  division_name: {
    type: String,
    default: ''
  },
  industry_id: {
    type: Schema.ObjectId,
    default: null
  },
  industry_name: {
    type: String,
    default: ''
  },
  segment_id: {
    type: Schema.ObjectId,
    default: null
  },
  segment_name: {
    type: String,
    default: ''
  }
}))

export default TourModule
