import { Router } from 'express'
const userRoutes = Router()
import {
  viewUsers,
  deleteUser,
  createUser,
  updateUser,
  appLogin,
  sessionCheck
} from '../controllers/userHandlers'

userRoutes.post('/all', viewUsers)
userRoutes.post('/create', createUser)
userRoutes.delete('/delete/:id', deleteUser)
userRoutes.put('/update/:id', updateUser)

userRoutes.post('/appauth', appLogin)
userRoutes.post('/sessioncheck', sessionCheck)

export default userRoutes
