import { Router } from 'express'
const webModuleRoutes = Router()
import {
  createWebModule,
  viewWebModules,
  deleteWebModule,
  updateWebModule,
  getOneWebModule,
} from '../../controllers/ApplicationSpecific/webModuleHandlers'

webModuleRoutes.post('/', createWebModule)
webModuleRoutes.get('/', viewWebModules)
webModuleRoutes.get('/:id', getOneWebModule)
webModuleRoutes.delete('/delete/:id', deleteWebModule)
webModuleRoutes.put('/update/:id', updateWebModule)

export default webModuleRoutes
