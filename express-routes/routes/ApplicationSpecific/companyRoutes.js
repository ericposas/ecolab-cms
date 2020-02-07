import { Router } from 'express'
const companyRoutes = Router()
import {
  createCompany,
  viewCompanies,
  deleteCompany,
} from '../../controllers/ApplicationSpecific/companyHandlers'

companyRoutes.post('/', createCompany)
companyRoutes.post('/view', viewCompanies)
companyRoutes.delete('/delete/:id', deleteCompany)

export default companyRoutes
