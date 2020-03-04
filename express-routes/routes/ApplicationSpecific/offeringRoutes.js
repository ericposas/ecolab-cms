import { Router } from 'express'
const offeringRoutes = Router()
import {
  getOfferingByParentSegment
} from '../../controllers/ApplicationSpecific/offeringHandlers'

offeringRoutes.post('/bySegmentName', getOfferingByParentSegment)

export default offeringRoutes
