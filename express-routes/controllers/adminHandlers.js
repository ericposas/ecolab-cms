import Admin from '../models/Admin'
import { sendMail } from './passwordResetHandlers'
import bcrypt from 'bcrypt'
import uuid from 'uuid'

// manually salting and hashing...
const createAdmin = (req, res) => {
  console.log(req.body)
  let hash,
      code = uuid()
  const insertNewAdmin = () => {
    Admin({ name: req.body.name, email: req.body.email, password: hash, resetCode: code, creator_id: req.session.adminId })
      .save()
      .then(() => {
        sendMail(res, req.body.email, code, () => {
          res.send({ success: 'admin created' })
        })
      })
      .catch(err => res.send({ error: err.errmsg }))
  }
  if (req.body.name && req.body.email) {
    let saltRounds = 10
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(uuid(), salt, (err, _hash) => {
        hash = _hash
        if (req.session.adminId) insertNewAdmin()
        else res.send({ error: 'no admin creator id found' })
      })
    })
  } else {
    res.send({ error: 'error occurred..' })
  }
}

const getAdmins = (req, res) => {
  if (req.session.auth) {
    Admin.find()
      .then(data => res.send(data))
      .catch(err => console.log(err))
  }
}

const deleteAdmin = (req, res) => {
  if (req.params.id) {
    Admin.deleteOne({ _id: req.params.id })
      .then(data => res.send(data))
      .catch(err => console.log(err))
  }
}

export {
  getAdmins,
  deleteAdmin,
  createAdmin
}
