import { Router } from 'express'
const tourModuleRoutes = Router()
import {
  createTourModule,
  viewTourModules,
  deleteTourModule,
} from '../../controllers/ApplicationSpecific/tourModuleHandlers'

tourModuleRoutes.post('/', createTourModule)
tourModuleRoutes.post('/view', viewTourModules)
tourModuleRoutes.delete('/delete/:id', deleteTourModule)

export default tourModuleRoutes
