import Admin from '../models/Admin'
import bcrypt from 'bcrypt'

const authCheck = (req, res) => {
  // console.log(req.session)
  if (req.session && req.session.auth) {
    res.send(JSON.stringify({
      // admin: req.session.admin || false,
      auth: true,
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
  if (req.body.email && req.body.password) {
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
              req.session.adminId = data._id
              // req.session.cookie.expires
              req.session.cookie.maxAge = 1000 * 60 * 15 // 15 min.
              req.session.save()
              res.send({ auth: true, name: data.name, email: data.email })
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
