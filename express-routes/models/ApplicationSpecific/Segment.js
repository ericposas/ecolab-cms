// import { model, Schema } from 'mongoose'
const { model, Schema } = require('mongoose')

const Segment = model('Segment', new Schema({
  name: {
    type: String,
    unique: true
  },
  parent_industry: {
    type: String,
    default: ''
  },
  offering_ids: {
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

// export default Segment

module.exports = Segment
