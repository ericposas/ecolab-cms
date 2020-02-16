import { Router } from 'express'
const companyRoutes = Router()
import {
  createCompany,
  viewCompanies,
  deleteCompany,
  getOneCompany,
  updateCompany,
} from '../../controllers/ApplicationSpecific/companyHandlers'

companyRoutes.post('/', createCompany)
companyRoutes.post('/view', viewCompanies)
companyRoutes.delete('/delete/:id', deleteCompany)
companyRoutes.post('/:id', getOneCompany)
companyRoutes.put('/update/:id', updateCompany)

export default companyRoutes
