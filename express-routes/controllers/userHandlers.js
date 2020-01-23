import User from '../models/User'
import bcrypt from 'bcrypt'

// manually salting and hashing...
const createUser = (req, res) => {
  // console.log(req.body)
  let hash
  const insertNewUser = () => {
    User({ name: req.body.name, email: req.body.email, password: hash })
      .save()
      .then(() => {
        res.send('success')
      })
      .catch(err => console.log(err))
  }
  if (process.env.MODE == 'development' ||
      process.env.MODE == 'production' && req.session.admin == true) {
    if (req.body.name && req.body.email && req.body.password) {
      let saltRounds = 10
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, _hash) => {
          hash = _hash
          insertNewUser()
        })
      })
    } else {
      res.send('error occurred..')
    }
  } else { res.send('must be admin to create new users') }
}

const viewUsers = (req, res) => {
  if (process.env.MODE == 'development' ||
      process.env.MODE == 'production' && req.session.auth == true) {
    User.find()
      .then(data => res.send(data))
      .catch(err => console.log(err))
  }
}

const deleteUser = (req, res) => {
  if (req.params.id) {
    User.deleteOne({ _id: req.params.id })
      .then(data => res.send(data))
      .catch(err => console.log(err))
  }
}

export {
  viewUsers,
  deleteUser,
  createUser
}
