import { Schema, Types } from 'mongoose'
import CustomModule from '../../models/ApplicationSpecific/CustomModule'

const createCustomModule = (req, res) => {
  // if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  // else {
    // console.log(req.body)
    if (req.body.image_url) {
      CustomModule({ image_url: req.body.image_url })
      .save()
      .then(() => res.send({ success: 'custom module saved' }))
      .catch(err => res.send({ error: 'db err occurred' }))
    } else {
      res.send({ error: 'incorrect params provided' })
    }
  // }
}

const viewCustomModules = (req, res) => {
  // if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  // else {
    CustomModule.find()
      .then(data => res.send({ success: data }))
      .catch(err => res.send({ error: 'error occurred getting tour module data' }))
  // }
}

const deleteCustomModule = (req, res) => {
  // if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  // else {
    if (req.params.id) {
      let id = req.params.id
      CustomModule.deleteOne({ _id: id })
        .then(doc => res.send({ success: `${id} successfully deleted.` }))
        .catch(err => res.send({ error: 'db error' }))
    } else {
      res.send({ error: 'no object id provided' })
    }
  // }
}

const getOneCustomModule = (req, res) => {
  // if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  // else {
    if (req.params.id) {
      const { id } = req.params
      CustomModule.findOne({ _id: id })
        .then(doc => res.send({ success: doc }))
        .catch(err => res.send({ error: 'db error -- retrieving custom module failed.' }))
    } else {
      res.send({ error: 'no object id provided' })
    }
  // }
}

const updateCustomModule = (req, res) => {
  // if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  // else {
    if (req.params.id) {
      const { id } = req.params
      console.log(id)
      CustomModule.findOne({ _id: id })
        .then(doc => {
          if (doc) {
            doc.image_url = req.body.image_url
            doc.save()
              .then(doc => res.send({ success: `updated ${doc._id} successfully` }))
              .catch(err => res.send({ error: `error occurred updating ${doc._id}` }))
          }
        })
        .catch(err => res.send({ error: 'error occurred finding custom module doc' }))
    } else {
      res.send({ error: 'no id param sent' })
    }
  // }
}

export {
  createCustomModule,
  viewCustomModules,
  deleteCustomModule,
  getOneCustomModule,
  updateCustomModule,
}
