import { Router } from 'express'
const userRoutes = Router()
import {
  viewUsers,
  deleteUser,
  createUser
} from '../controllers/userHandlers'

userRoutes.post('/all', viewUsers)
userRoutes.post('/create', createUser)
userRoutes.delete('/delete/:id', deleteUser)

export default userRoutes