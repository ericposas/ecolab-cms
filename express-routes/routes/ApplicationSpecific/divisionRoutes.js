import { Router } from 'express'
const divisionRoutes = Router()
import {
  getDivisions,

} from '../../controllers/ApplicationSpecific/divisionHandlers'

divisionRoutes.post('/view', getDivisions)

export default divisionRoutes
