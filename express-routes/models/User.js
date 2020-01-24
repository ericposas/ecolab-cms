import { model, Schema } from 'mongoose'
// import passportLocalMongoose from 'passport-local-mongoose'

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
  admin: {
    type: Boolean,
    default: false
  },
  updated: {
    type: Date,
    default: Date.now
  }
}))

// User.plugin(passportLocalMongoose)

// export default model('User', User)

export default User
