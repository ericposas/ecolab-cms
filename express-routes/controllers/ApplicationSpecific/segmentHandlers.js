import { Schema, Types } from 'mongoose'
import Segment from '../../models/ApplicationSpecific/Segment'

const getSegments = (req, res) => {
  Segment.find()
    .then(data => res.send({ success: data }))
    .catch(err => res.send({ error: 'error occurred getting segment data' }))
}

export {
  getSegments,

}
