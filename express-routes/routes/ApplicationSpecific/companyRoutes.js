import { Router } from 'express'
const companyRoutes = Router()
import {
  createCompany
} from '../../controllers/ApplicationSpecific/companyHandlers'

companyRoutes.post('/', createCompany)

export default companyRoutes
