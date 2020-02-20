import { Router } from 'express'
const customModuleRoutes = Router()
import {
  createCustomModule,
  viewCustomModules,
  deleteCustomModule,
  getOneCustomModule,
  updateCustomModule,
} from '../../controllers/ApplicationSpecific/customModuleHandlers'

customModuleRoutes.post('/', createCustomModule)
customModuleRoutes.get('/', viewCustomModules)
customModuleRoutes.get('/:id', getOneCustomModule)
customModuleRoutes.delete('/delete/:id', deleteCustomModule)
customModuleRoutes.put('/update/:id', updateCustomModule)

export default customModuleRoutes
