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
customModuleRoutes.post('/view', viewCustomModules)
customModuleRoutes.delete('/delete/:id', deleteCustomModule)
customModuleRoutes.post('/:id', getOneCustomModule)
customModuleRoutes.put('/update/:id', updateCustomModule)

export default customModuleRoutes
