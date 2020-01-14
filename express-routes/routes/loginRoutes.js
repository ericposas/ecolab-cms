// import passport from 'passport'
import { Router } from 'express'
const loginRoutes = Router()
import {
  signup,
  authCheck,
  logout,
  login
} from '../controllers/loginHandlers'

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

loginRoutes.post('/signup', signup)
loginRoutes.post('/authCheck', authCheck)
loginRoutes.post('/login', login)
loginRoutes.post('/logout', logout)

export default loginRoutes
