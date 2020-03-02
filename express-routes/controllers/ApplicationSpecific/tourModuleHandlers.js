import { Types } from 'mongoose'
import TourModule from '../../models/ApplicationSpecific/TourModule'

const createTourModule = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    console.log(req.body)
    if (req.body.name &&
        req.body.company_id && req.body.division_id &&
        req.body.industry_id && req.body.segment_id &&
        req.body.company_name && req.body.division_name &&
        req.body.industry_name && req.body.segment_name
      ) {
      TourModule({
        name: req.body.name,
        creator_id: Types.ObjectId(req.session.appuserid),
        company_id: Types.ObjectId(req.body.company_id),
        company_name: req.body.company_name,
        division_id: Types.ObjectId(req.body.division_id),
        division_name: req.body.division_name,
        industry_id: Types.ObjectId(req.body.industry_id),
        industry_name: req.body.industry_name,
        segment_id: Types.ObjectId(req.body.segment_id),
        segment_name: req.body.segment_name,
      })
      .save()
      .then(() => res.send({ success: 'tour module saved' }))
      .catch(err => res.send({ error: 'db err occurred' }))
    } else {
      res.send({ error: 'incorrect params provided' })
    }
  }
}

const viewTourModules = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    TourModule.find()
      .then(data => res.send({ success: data }))
      .catch(err => res.send({ error: 'error occurred getting tour module data' }))
  }
}

const deleteTourModule = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    if (req.params.id) {
      let id = req.params.id
      TourModule.deleteOne({ _id: id })
        .then(doc => res.send({ success: id + ' successfully deleted.' }))
        .catch(err => res.send({ error: 'db error' }))
    } else {
      res.send({ error: 'no object id provided' })
    }
  }
}

const getOneTourModule = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    if (req.params.id) {
      const { id } = req.params
      TourModule.findOne({ _id: id })
        .then(doc => res.send({ success: doc }))
        .catch(err => res.send({ error: 'db error -- retrieving tour failed.' }))
    } else {
      res.send({ error: 'no object id provided' })
    }
  }
}

const updateTourModule = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    if (req.params.id && req.session.appuserid) {
      const { id } = req.params
      console.log(id)
      TourModule.findOne({ _id: id })
        .then(doc => {
          console.log(doc)
          if (doc) {
            doc.name = req.body.name ? req.body.name : doc.name,
            doc.creator_id = Types.ObjectId(req.session.appuserid)
            doc.company_id = req.body.company_id ? Types.ObjectId(req.body.company_id) : doc.company_id
            doc.company_name = req.body.company_name ? req.body.company_name : doc.company_name
            doc.division_id = req.body.division_id ? Types.ObjectId(req.body.division_id) : doc.division_id
            doc.division_name = req.body.division_name ? req.body.division_name : doc.division_name
            doc.industry_id = req.body.industry_id ? Types.ObjectId(req.body.industry_id) : doc.industry_id
            doc.industry_name = req.body.industry_name ? req.body.industry_name : doc.industry_name
            doc.segment_id = req.body.segment_id ? Types.ObjectId(req.body.segment_id) : doc.segment_id
            doc.segment_name = req.body.segment_name ? req.body.segment_name : doc.segment_name
            doc.enabled = req.body.enabled != doc.enabled ? req.body.enabled : doc.enabled
            doc.save()
              .then(doc => res.send({ success: `updated ${doc._id} successfully` }))
              .catch(err => res.send({ error: `error occurred updating ${doc._id}` }))
          }
        })
        .catch(err => res.send({ error: 'error occurred finding tour doc' }))
    } else {
      res.send({ error: 'no id param sent or not logged in' })
    }
  }
}

export {
  createTourModule,
  viewTourModules,
  deleteTourModule,
  getOneTourModule,
  updateTourModule,
}
