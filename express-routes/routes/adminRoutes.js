import { Router } from 'express'
const adminRoutes = Router()
import {
  getAdmins,
  deleteAdmin,
  createAdmin,
  updateAdmin
} from '../controllers/adminHandlers'

adminRoutes.post('/all', getAdmins)
adminRoutes.delete('/delete/:id', deleteAdmin)
adminRoutes.post('/create', createAdmin)
adminRoutes.put('/update/:id', updateAdmin)

export default adminRoutes
