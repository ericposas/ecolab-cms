import { Schema, Types } from 'mongoose'
import Company from '../../models/ApplicationSpecific/Company'

const createCompany = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    if (req.body.name && req.body.logo && req.body.customer_names) {
      Company({
        name: req.body.name,
        logo_image_url: req.body.logo,
        customer_names: req.body.customer_names,
        notes: req.body.notes ? req.body.notes : '',
        creator_id: Types.ObjectId(req.session.appuserid)
      })
      .save()
      .then(() => res.send({ success: 'company profile saved' }))
      .catch(err => res.send({ error: 'db err, possible dup key' }))
    } else {
      res.send({ error: 'incorrect params provided' })
    }
  }
}

const viewCompanies = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  // console.log(req.session, req.session.appuserid)
  else {
    Company.find()
      .then(data => res.send({ success: data }))
      .catch(err => res.send({ error: 'error occurred getting company data' }))
  }
}

const deleteCompany = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    if (req.params.id) {
      let id = req.params.id
      Company.deleteOne({ _id: id })
        .then(doc => res.send({ success: id + ' successfully deleted.' }))
        .catch(err => res.send({ error: 'db error' }))
    } else {
      res.send({ error: 'no object id provided' })
    }
  }
}

export {
  createCompany,
  viewCompanies,
  deleteCompany,
}
