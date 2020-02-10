import { Router } from 'express'
const industryRoutes = Router()
import {
  getIndustries,

} from '../../controllers/ApplicationSpecific/industryHandlers'

industryRoutes.post('/view', getIndustries)

export default industryRoutes
