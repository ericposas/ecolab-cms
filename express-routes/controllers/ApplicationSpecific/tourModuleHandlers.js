import { Schema, Types } from 'mongoose'
import TourModule from '../../models/ApplicationSpecific/TourModule'

const createTourModule = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    console.log(req.body)
    if (req.body.name &&
        req.body.company_id && req.body.division_id &&
        req.body.industry_id && req.body.segment_id) {
      TourModule({
        name: req.body.name,
        creator_id: Types.ObjectId(req.session.appuserid),
        company_id: Types.ObjectId(req.body.company_id),
        division_id: Types.ObjectId(req.body.division_id),
        industry_id: Types.ObjectId(req.body.industry_id),
        segment_id: Types.ObjectId(req.body.segment_id),
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
    if (req.params.id) {
      const { id } = req.params
      console.log(id)
      TourModule.findOne({ _id: id })
        .then(doc => {
          console.log(doc)
          if (doc) {
            doc.name = req.body.name,
            doc.creator_id = Types.ObjectId(req.session.appuserid)
            doc.company_id = Types.ObjectId(req.body.company_id)
            doc.division_id = Types.ObjectId(req.body.division_id)
            doc.industry_id = Types.ObjectId(req.body.industry_id)
            doc.segment_id = Types.ObjectId(req.body.segment_id)
            doc.save()
              .then(doc => res.send({ success: `updated ${doc._id} successfully` }))
              .catch(err => res.send({ error: `error occurred updating ${doc._id}` }))
          }
        })
        .catch(err => res.send({ error: 'error occurred finding tour doc' }))
    } else {
      res.send({ error: 'no id param sent' })
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
