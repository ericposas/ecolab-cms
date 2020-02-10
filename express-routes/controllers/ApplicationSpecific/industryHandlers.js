import { Schema, Types } from 'mongoose'
import Industry from '../../models/ApplicationSpecific/Industry'

const getIndustries = (req, res) => {
  Industry.find()
    .then(data => res.send({ success: data }))
    .catch(err => res.send({ error: 'error occurred getting industry data' }))
}

export {
  getIndustries,

}
