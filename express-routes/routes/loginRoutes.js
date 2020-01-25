import { Router } from 'express'
const loginRoutes = Router()
import {
  signup,
  authCheck,
  logout,
  login
} from '../controllers/loginHandlers'

loginRoutes.post('/signup', signup)
loginRoutes.post('/authCheck', authCheck)
loginRoutes.post('/login', login)
loginRoutes.post('/logout', logout)

export default loginRoutes
