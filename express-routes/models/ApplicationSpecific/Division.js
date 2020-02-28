// import { model, Schema } from 'mongoose'
const { model, Schema } = require('mongoose')

const Division = model('Division', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
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

// export default Division
module.exports = Division
