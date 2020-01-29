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
        res.send({ success: 'user created' })
      })
      .catch(err => res.send({ error: err.errmsg }))
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
      res.send({ error: 'error occurred..' })
    }
  } else { res.send({ error: 'must be admin to create new users' }) }
}

const viewUsers = (req, res) => {
  if (req.session.auth) {
    User.find()
      .then(data => res.send(data))
      .catch(err => res.send({ error: err.errmsg }))
  }
}

const deleteUser = (req, res) => {
  if (req.params.id) {
    User.deleteOne({ _id: req.params.id })
      .then(data => res.send(data))
      .catch(err => res.send({ error: err.errmsg }))
  }
}

export {
  viewUsers,
  deleteUser,
  createUser
}
