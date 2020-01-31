import { Router } from 'express'
const adminRoutes = Router()
import {
  getAdmins,
  deleteAdmin,
  createAdmin
} from '../controllers/adminHandlers'

adminRoutes.post('/all', getAdmins)
adminRoutes.delete('/delete/:id', deleteAdmin)
adminRoutes.post('/create', createAdmin)

export default adminRoutes
