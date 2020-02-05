import { Router } from 'express'
const webModuleRoutes = Router()
import {
  createWebModule,
  viewWebModules,
} from '../../controllers/ApplicationSpecific/webModuleHandlers'

webModuleRoutes.post('/', createWebModule)
webModuleRoutes.post('/view', viewWebModules)

export default webModuleRoutes
