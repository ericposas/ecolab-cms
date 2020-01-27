import { Router } from 'express'
const adminRoutes = Router()
import {
  getAdmins,
  deleteAdmin
} from '../controllers/adminHandlers'

adminRoutes.post('/all', getAdmins)
adminRoutes.delete('/delete/:id', deleteAdmin)

export default adminRoutes
