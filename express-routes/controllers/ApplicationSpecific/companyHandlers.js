import { Schema } from 'mongoose'
import Company from '../../models/ApplicationSpecific/Company'

const createCompany = (req, res) => {
  // console.log(req.body, req.session)
  if (req.body.name && req.body.logo && req.body.customer_names) {
    if (req.session.appuserid) {
      Company({
        name: req.body.name,
        logo_image_url: req.body.logo,
        customer_names: req.body.customer_names,
        notes: req.body.notes,
        creator_id: Schema.ObjectId(req.session.appuserid)
      })
      .save()
      .then(() => res.send({ success: 'company profile saved' }))
      .catch(err => res.send({ error: 'db err, possible dup key' }))
    } else {
      res.send({ error: 'user is not logged in' })
    }
  } else {
    res.send({ error: 'incorrect params provided' })
  }
}

export {
  createCompany
}
