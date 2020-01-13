// import passport from 'passport'
import { Router } from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'
const dataRoutes = Router()

// dataRoutes.post('/signup', (req, res) => {
//   User.register(new User({ name: req.body.name }), req.body.password, (err, user) => {
//     if (err) return res.send('error')
//     passport.authenticate('local')(req, res, () => {
//       res.send('log in successful')
//     })
//   })
// })
//
// dataRoutes.post('/login', passport.authenticate('local'), (req, res) => {
//   res.send('success logged in page')
// })
//
// dataRoutes.post('/logout', (req, res) => {
//   req.logout()
//   res.send('logged out')
// })

dataRoutes.post('/authCheck', (req, res) => {
  console.log(req.session)
  if (req.session && req.session.auth == true) {
    res.send('authenticated')
  } else {
    res.send('unauthorized')
  }
})

dataRoutes.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy()
    res.redirect('/')
  }
})

dataRoutes.post('/login', (req, res) => {
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
})

// manually salting and hashing...
dataRoutes.post('/signup', (req, res) => {
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
})

export default dataRoutes
