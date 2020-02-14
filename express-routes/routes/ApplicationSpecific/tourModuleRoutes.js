import { Router } from 'express'
const tourModuleRoutes = Router()
import {
  createTourModule,
  viewTourModules,
  deleteTourModule,
  getOneTourModule,
  updateTourModule,
} from '../../controllers/ApplicationSpecific/tourModuleHandlers'

tourModuleRoutes.post('/', createTourModule)
tourModuleRoutes.post('/view', viewTourModules)
tourModuleRoutes.delete('/delete/:id', deleteTourModule)
tourModuleRoutes.post('/:id', getOneTourModule)
tourModuleRoutes.put('/update/:id', updateTourModule)

export default tourModuleRoutes
