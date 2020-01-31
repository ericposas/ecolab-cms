import { model, Schema } from 'mongoose'

const Admin = model('Admin', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
  resetCode: {
    type: String,
    default: null
  },
  creator_id: {
    type: Schema.ObjectId,
    default: null
  },
  owner: {
    type: Boolean,
    default: false
  }
}))

export default Admin
