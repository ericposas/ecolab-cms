import { Router } from 'express'
const segmentRoutes = Router()
import {
  getSegments,

} from '../../controllers/ApplicationSpecific/segmentHandlers'

segmentRoutes.get('/', getSegments)

export default segmentRoutes
