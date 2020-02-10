import { Router } from 'express'
const segmentRoutes = Router()
import {
  getSegments,

} from '../../controllers/ApplicationSpecific/segmentHandlers'

segmentRoutes.post('/view', getSegments)

export default segmentRoutes
