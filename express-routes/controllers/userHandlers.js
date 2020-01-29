import User from '../models/User'
import bcrypt from 'bcrypt'
import uuid from 'uuid'

// For application login..
const appLogin = (req, res) => {
  console.log(req.body)
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email })
      .then(doc => {
        console.log(doc)
        bcrypt.compare(req.body.password, doc.password, (err, result) => {
          if (result == true) {
            // add session for application user
            req.session.auth = true
            req.session.name = doc.name
            req.session.email = doc.email
            req.session.maxAge = 1000 * 60 * 15
            req.session.save()
            res.send({ auth: true, name: doc.name, email: doc.email })
          } else {
            res.send({ error: 'wrong password.' })
          }
        })
      })
      .catch(err => res.send({ error: err }))
  } else {
    res.send({ error: 'no body params provided.' })
  }
}

// manually salting and hashing...
const createUser = (req, res) => {
  console.log(req.body)
  let hash
  const insertNewUser = () => {
    User({ name: req.body.name, email: req.body.email, password: hash })
      .save()
      .then(() => {
        res.send({ success: 'user created' })
      })
      .catch(err => res.send({ error: err.errmsg }))
  }
  if (req.body.name && req.body.email) {
    let saltRounds = 10
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(uuid(), salt, (err, _hash) => {
        hash = _hash
        insertNewUser()
      })
    })
  } else {
    res.send({ error: 'error occurred..' })
  }
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

const updateUser = (req, res) => {
  if (req.params.id) {
    User.findOne({ _id: req.params.id })
      .then(doc => {
        // console.log(doc)
        if (doc) {
          doc.name = req.body.name
          doc.email = req.body.email
          doc.active = req.body.active
          doc.save()
            .then(doc => res.send({ success: 'successfully updated user.' }))
            .catch(err => res.send({ error: 'error updating user.' }))
        } else {
          res.send({ error: 'no user found.' })
        }
      })
      .catch(err => res.send({ error: 'error occurred.' }))
  } else {
    res.send({ error: 'no id parameter supplied.' })
  }
}

export {
  viewUsers,
  deleteUser,
  createUser,
  updateUser,
  appLogin
}
