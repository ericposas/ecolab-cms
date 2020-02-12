import { Schema, Types } from 'mongoose'
import Division from '../../models/ApplicationSpecific/Division'

const getDivisions = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    Division.find()
      .then(data => res.send({ success: data }))
      .catch(err => res.send({ error: 'error occurred getting division data' }))
  }
}

export {
  getDivisions,

}
