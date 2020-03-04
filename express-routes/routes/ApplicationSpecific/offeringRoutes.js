import { Router } from 'express'
const offeringRoutes = Router()
import {
  getOfferingByParentSegment,
  updateOffering
} from '../../controllers/ApplicationSpecific/offeringHandlers'

offeringRoutes.post('/bySegmentName', getOfferingByParentSegment)
offeringRoutes.put('/:id', updateOffering)

export default offeringRoutes
