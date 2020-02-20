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
tourModuleRoutes.get('/', viewTourModules)
tourModuleRoutes.get('/:id', getOneTourModule)
tourModuleRoutes.delete('/delete/:id', deleteTourModule)
tourModuleRoutes.put('/update/:id', updateTourModule)

export default tourModuleRoutes
