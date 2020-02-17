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
webModuleRoutes.post('/view', viewWebModules)
webModuleRoutes.delete('/delete/:id', deleteWebModule)
webModuleRoutes.put('/update/:id', updateWebModule)
webModuleRoutes.post('/:id', getOneWebModule)

export default webModuleRoutes
