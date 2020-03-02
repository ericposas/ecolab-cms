import { Types } from 'mongoose'
import WebModule from '../../models/ApplicationSpecific/WebModule'

const createWebModule = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    if (req.body.browser_url) {
      WebModule({
        browser_url: req.body.browser_url,
        creator_id: Types.ObjectId(req.session.appuserid)
      })
      .save()
      .then(() => res.send({ success: 'web module document saved!' }))
      .catch(err => res.send({ error: 'could not save web module' }))
    } else {
      res.send({ error: 'no web module url provided' })
    }
  }
}

const viewWebModules = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else
    WebModule.find()
      .then(results => res.send({ success: results }))
      .catch(err => res.send({ error: 'could not fetch data' }))
}

const deleteWebModule = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    if (req.params.id) {
      let id = req.params.id
      console.log(id)
      WebModule.deleteOne({ _id: id })
        .then(doc => {
          // console.log(doc)
          res.send({ success: id + ' successfully deleted.' })
        })
        .catch(err => res.send({ error: 'db error' }))
    } else {
      res.send({ error: 'no object id provided' })
    }
  }
}

const getOneWebModule = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    if (req.params.id) {
      const { id } = req.params
      WebModule.findOne({ _id: id })
        .then(doc => res.send({ success: doc }))
        .catch(err => res.send({ error: 'db error -- retrieving webmodule failed.' }))
    } else {
      res.send({ error: 'no object id provided' })
    }
  }
}

const updateWebModule = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    if (req.params.id) {
      const { id } = req.params
      WebModule.findOne({ _id: id })
        .then(doc => {
          if (doc) {
            doc.browser_url = req.body.browser_url ? req.body.browser_url : doc.browser_url
            doc.enabled = req.body.enabled != doc.enabled ? req.body.enabled : doc.enabled
            doc.save()
              .then(doc => res.send({ success: `updated ${doc._id} successfully` }))
              .catch(err => res.send({ error: `error occurred updating ${doc._id}` }))
          }
        })
        .catch(err => res.send({ error: 'error occurred finding webmodule doc' }))
    } else {
      res.send({ error: 'no id param sent' })
    }
  }
}

export {
  createWebModule,
  viewWebModules,
  deleteWebModule,
  getOneWebModule,
  updateWebModule,
}
