import { Router } from 'express'
const divisionRoutes = Router()
import {
  getDivisions,

} from '../../controllers/ApplicationSpecific/divisionHandlers'

divisionRoutes.get('/', getDivisions)

export default divisionRoutes
