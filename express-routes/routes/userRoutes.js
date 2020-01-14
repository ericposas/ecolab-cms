import { Router } from 'express'
const userRoutes = Router()
import {
  viewUsers,
  deleteUser
} from '../controllers/userHandlers'

userRoutes.post('/view', viewUsers)
userRoutes.delete('/delete/user/:id', deleteUser)

export default userRoutes
