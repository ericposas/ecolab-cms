import { model, Schema } from 'mongoose'

const User = model('User', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  resetCode: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  peer: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  creator_id: {
    type: Schema.ObjectId,
    default: null
  },
  full_access: {
    type: Boolean,
    default: false
  },
  updated: {
    type: Date,
    default: Date.now
  }
}))

export default User
