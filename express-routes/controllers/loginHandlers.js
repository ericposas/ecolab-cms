import User from '../models/User'
import bcrypt from 'bcrypt'

const authCheck = (req, res) => {
  console.log(req.session)
  if (req.session && req.session.auth == true) {
    // res.send('authenticated')
    res.send(JSON.stringify({
      auth: true,
      admin: req.session.admin || false,
      name: req.session.name,
      email: req.session.email
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
  // let pass = req.body.password
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email })
      .then(data => {
        if (data && data.password) {
          console.log(data.password)
          bcrypt.compare(req.body.password, data.password, (err, result) => {
            if (result == true) {
              if (data.admin == true) req.session.admin = true
              else req.session.admin = false
              req.session.auth = true
              req.session.name = data.name
              req.session.email = data.email
              // req.session.cookie.expires
              req.session.cookie.maxAge = 1000 * 60 * 15 // 15 min.
              req.session.save()
              res.send('authorized')
            } else {
              res.send('invalid data')
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