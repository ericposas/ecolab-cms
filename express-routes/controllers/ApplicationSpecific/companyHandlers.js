import { Schema, Types } from 'mongoose'
import Company from '../../models/ApplicationSpecific/Company'

const createCompany = (req, res) => {
  console.log(req.session)
  if (req.body.name && req.body.logo && req.body.customer_names) {
    Company({
      name: req.body.name,
      logo_image_url: req.body.logo,
      customer_names: req.body.customer_names,
      notes: req.body.notes ? req.body.notes : '',
      creator_id: Types.ObjectId(req.session.appuserid)
    })
    .save()
    .then(() => {
      req.session.save()
      res.send({ success: 'company profile saved' })
    })
    .catch(err => res.send({ error: 'db err, possible dup key' }))
  } else {
    res.send({ error: 'incorrect params provided' })
  }
}

const viewCompanies = (req, res) => {
  console.log(req.session.appuserid)
  Company.find()
    .then(data => res.send({ success: data }))
    .catch(err => res.send({ error: 'error occurred getting company data' }))
}

export {
  createCompany,
  viewCompanies
}
