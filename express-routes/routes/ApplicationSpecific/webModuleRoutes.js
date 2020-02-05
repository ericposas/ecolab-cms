import { Router } from 'express'
const webModuleRoutes = Router()
import {
  createWebModule,
  viewWebModules,
  deleteWebModule,
} from '../../controllers/ApplicationSpecific/webModuleHandlers'

webModuleRoutes.post('/', createWebModule)
webModuleRoutes.post('/view', viewWebModules)
webModuleRoutes.delete('/delete/:id', deleteWebModule)

export default webModuleRoutes
