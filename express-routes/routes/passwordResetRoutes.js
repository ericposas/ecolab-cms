import { Router } from 'express'
const passwordResetRoutes = Router()
import {
  forgot,
  code,
  update,
} from '../controllers/passwordResetHandlers'

// admin will initiate a password reset by inputting the user's email
passwordResetRoutes.post('/forgot', forgot)
// route to the user -- pass in form data
passwordResetRoutes.post('/code', code)
// pass in form data
passwordResetRoutes.post('/update', update)

export default passwordResetRoutes
