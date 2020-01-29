import { Router } from 'express'
const userRoutes = Router()
import {
  viewUsers,
  deleteUser,
  createUser,
  updateUser,
  appLogin
} from '../controllers/userHandlers'

userRoutes.post('/all', viewUsers)
userRoutes.post('/create', createUser)
userRoutes.delete('/delete/:id', deleteUser)
userRoutes.put('/update/:id', updateUser)

userRoutes.post('/appauth', appLogin)

export default userRoutes
