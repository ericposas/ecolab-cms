import User from '../models/User'
import bcrypt from 'bcrypt'

const signup = (req, res) => {
  console.log(req.body)
  let hash
  const insertNewUser = () => {
    User({ name: req.body.name, email: req.body.email, password: hash })
      .save()
      .then(() => {
        res.send('success')
      })
      .catch(err => console.log(err))
  }
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
}

const authCheck = (req, res) => {
  console.log(req.session)
  if (req.session && req.session.auth == true) {
    res.send('authenticated')
  } else {
    res.send('unauthorized')
  }
}

const logout = (req, res) => {
  if (req.session) {
    req.session.destroy()
    res.redirect('/')
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
            req.session.auth = true
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
