import User from '../models/User'
import bcrypt from 'bcrypt'
import uuid from 'uuid'
import { sendMail, code } from './passwordResetHandlers'

// Check for valid user session..
const sessionCheck = (req, res) => {
  if (req.session.appuserauth) res.send({ auth: true, fullaccess: req.session.appuserfullaccess, peer: req.session.appuserpeer, name: req.session.appusername, email: req.session.appuseremail })
  else res.send({ error: false })
}

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
            req.session.appuserauth = true
            req.session.appusername = doc.name
            req.session.appuseremail = doc.email
            req.session.appuserfullaccess = doc.full_access
            console.log(doc.full_access, req.session.appuserfullaccess)
            req.session.appuserpeer = doc.peer
            req.session.maxAge = 1000 * 60 * 15
            req.session.save()
            res.send({ auth: true, fullaccess: doc.full_access, peer: doc.peer, name: doc.name, email: doc.email })
          } else {
            // try login via code
            code(req, res, () => {
              res.send({ reset: 'correct reset code provided.' })
            })
            // res.send({ error: 'wrong password.' })
          }
        })
      })
      .catch(err => res.send({ error: 'error occurred.' }))
  } else {
    res.send({ error: 'no body params provided.' })
  }
}

// manually salting and hashing...
const createUser = (req, res) => {
  console.log(req.body)
  let hash,
      code = uuid()
  const insertNewUser = () => {
    User({ name: req.body.name, email: req.body.email, password: hash, resetCode: code, creator_id: req.session.adminId })
      .save()
      .then(() => {
        sendMail(res, req.body.email, code, () => {
          res.send({ success: 'user created' })
        }, req.body.name)
      })
      .catch(err => res.send({ error: err.errmsg }))
  }
  if (req.body.name && req.body.email) {
    let saltRounds = 10
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(uuid(), salt, (err, _hash) => {
        hash = _hash
        if (req.session.adminId) insertNewUser()
        else res.send({ error: 'no admin creator id found' })
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
          doc.full_access = req.body.fullaccess
          doc.peer = req.body.peer
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
  appLogin,
  sessionCheck
}
