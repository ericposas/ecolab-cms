import { Router } from 'express'
const offeringRoutes = Router()
import {
  getOfferingByParentSegment,
  updateOffering,
  getAllOfferings
} from '../../controllers/ApplicationSpecific/offeringHandlers'

offeringRoutes.get('/', getAllOfferings)
offeringRoutes.post('/bySegmentName', getOfferingByParentSegment)
offeringRoutes.put('/update/:id', updateOffering)

export default offeringRoutes
