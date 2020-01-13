import mongoose, { Schema } from 'mongoose'

const Sample = mongoose.model('Sample', new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true
  }
}))

export default Sample
