import User from '../models/User'
import bcrypt from 'bcrypt'

const signup = (req, res) => {
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
  if (req.session.admin == true) { // comment this out to create users without admin check
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
  } else { res.send('must be admin to create new users') } // comment this out to create users without admin check
}

const authCheck = (req, res) => {
  console.log(req.session)
  if (req.session && req.session.auth == true) {
    // res.send('authenticated')
    res.send(JSON.stringify({
      auth: true,
      name: req.session.name,
      email: req.session.email,
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
        console.log(data.password)
        bcrypt.compare(req.body.password, data.password, (err, result) => {
          if (result == true) {
            if (data.admin == true) req.session.admin = true
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
      })
  } else {
    res.send('please provide valid credentials')
  }
}

export {
  signup,
  login,
  logout,
  authCheck
}
