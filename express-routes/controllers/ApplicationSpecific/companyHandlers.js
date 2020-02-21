import { Types } from 'mongoose'
import Company from '../../models/ApplicationSpecific/Company'
import TourModule from '../../models/ApplicationSpecific/TourModule'

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
        .then(doc => {
          console.log('now deleting associated Tours..')
          TourModule.deleteMany({ company_id: id })
            .then(results => {
              console.log('associated Tours deleted!')
              res.send({ success: `Company ${id} successfully deleted along with associated Tours.` })
            })
            .catch(err => res.send({ error: 'error deleting associated tours' }))
        })
        .catch(err => res.send({ error: 'error deleting company' }))
    } else {
      res.send({ error: 'no object id provided' })
    }
  }
}

const getOneCompany = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    if (req.params.id) {
      const { id } = req.params
      Company.findOne({ _id: id })
        .then(doc => res.send({ success: doc }))
        .catch(err => res.send({ error: 'db error -- retrieving company failed.' }))
    } else {
      res.send({ error: 'no object id provided' })
    }
  }
}

const updateCompany = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    if (req.params.id) {
      const { id } = req.params
      console.log(id)
      Company.findOne({ _id: id })
        .then(doc => {
          console.log(doc)
          if (doc) {
            doc.name = req.body.name,
            doc.logo_image_url = req.body.logo == '' ? doc.logo_image_url : req.body.logo,
            doc.customer_names = req.body.customer_names,
            doc.notes = req.body.notes ? req.body.notes : '',
            doc.creator_id = Types.ObjectId(req.session.appuserid)
            doc.save()
              .then(doc => res.send({ success: `updated company ${doc._id} successfully` }))
              .catch(err => res.send({ error: `error occurred updating ${doc._id}` }))
          }
        })
        .catch(err => res.send({ error: 'error occurred finding company doc' }))
    } else {
      res.send({ error: 'no id param sent' })
    }
  }
}

export {
  createCompany,
  viewCompanies,
  deleteCompany,
  getOneCompany,
  updateCompany,
}
