import { Router } from 'express'
const industryRoutes = Router()
import {
  getIndustries,

} from '../../controllers/ApplicationSpecific/industryHandlers'

industryRoutes.get('/', getIndustries)

export default industryRoutes
