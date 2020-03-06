import { Router } from 'express'
const offeringRoutes = Router()
import {
  // getOfferingByParentSegment,
  // getOfferingByParentSegmentId,
  updateOffering,
  getAllOfferings
} from '../../controllers/ApplicationSpecific/offeringHandlers'

// offeringRoutes.post('/bySegmentName', getOfferingByParentSegment)
// offeringRoutes.post('/bySegmentId', getOfferingByParentSegmentId)
offeringRoutes.get('/', getAllOfferings)
offeringRoutes.put('/update/:id', updateOffering)

export default offeringRoutes
