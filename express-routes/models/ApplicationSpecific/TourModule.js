import { model, Schema } from 'mongoose'

const TourModule = model('TourModule', new Schema({
  name: {
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
  company_id: {
    type: Schema.ObjectId,
    default: null
  },
  division_id: {
    type: Schema.ObjectId,
    default: null
  },
  industry_id: {
    type: Schema.ObjectId,
    default: null
  },
  segment_id: {
    type: Schema.ObjectId,
    default: null
  }
}))

export default TourModule
