import Admin from '../models/Admin'
import bcrypt from 'bcrypt'
import { code } from './passwordResetHandlers'

const authCheck = (req, res) => {
  // console.log(req.session)
  if (req.session && req.session.auth) {
    res.send(JSON.stringify({
      // admin: req.session.admin || false,
      auth: true,
      name: req.session.name,
      email: req.session.email,
      owner: req.session.owner
    }))
  } else {
    res.send(JSON.stringify({
      auth: false
    }))
  }
}

const logout = (req, res) => {
  if (req.session) {
    req.session.destroy()
    res.send('logged out')
  }
}

const login = (req, res) => {
  if (req.body.email && req.body.password && req.body.admin) {
    Admin.findOne({ email: req.body.email })
      .then(data => {
        if (data && data.password) {
          // console.log(data.password)
          bcrypt.compare(req.body.password, data.password, (err, result) => {
            if (result == true) {
              // if (data.admin == true) req.session.admin = true
              // else req.session.admin = false
              req.session.auth = true
              req.session.name = data.name
              req.session.email = data.email
              req.session.owner = data.owner
              req.session.adminId = data._id
              // req.session.cookie.expires
              req.session.cookie.maxAge = 1000 * 60 * 15 // 15 min.
              req.session.save(() => {
                data.resetCode = null
                data.save()
                  .then(() => res.send({ auth: true, owner: data.owner, name: data.name, email: data.email }))
                  .catch(err => res.send({ error: 'error updating document' }))
              })
            } else {
              // try login via code
              code(req, res, () => {
                res.send({ reset: 'correct reset code provided.' })
              })
            }
          })
        } else {
          res.send('invalid email')
        }
      })
  } else {
    res.send('please provide valid credentials')
  }
}

export {
  login,
  logout,
  authCheck
}
