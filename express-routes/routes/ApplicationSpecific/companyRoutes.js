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
companyRoutes.get('/', viewCompanies)
companyRoutes.get('/:id', getOneCompany)
companyRoutes.delete('/delete/:id', deleteCompany)
companyRoutes.put('/update/:id', updateCompany)

export default companyRoutes
