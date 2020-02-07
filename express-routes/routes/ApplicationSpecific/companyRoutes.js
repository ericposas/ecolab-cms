import { Router } from 'express'
const companyRoutes = Router()
import {
  createCompany,
  viewCompanies,
} from '../../controllers/ApplicationSpecific/companyHandlers'

companyRoutes.post('/', createCompany)
companyRoutes.post('/view', viewCompanies)

export default companyRoutes
