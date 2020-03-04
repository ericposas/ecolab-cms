import { Router } from 'express'
const offeringRoutes = Router()
import {
  getOfferingByParentSegment,
  updateOffering
} from '../../controllers/ApplicationSpecific/offeringHandlers'

offeringRoutes.post('/bySegmentName', getOfferingByParentSegment)
offeringRoutes.put('/update/:id', updateOffering)

export default offeringRoutes
