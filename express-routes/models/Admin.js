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
  fullaccess: {
    type: Boolean,
    default: false
  }
}))

export default Admin
