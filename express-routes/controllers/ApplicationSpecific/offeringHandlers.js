import Offering from '../../models/ApplicationSpecific/Offering'

const getOfferingByParentSegment = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    if (req.body.segment) {
      Offering.find({ parent_segment: req.body.segment })
        .then(data => res.send({ success: data }))
        .catch(err => res.send({ error: 'error occurred retrieving offering data' }))
    } else {
      res.send({ error: 'please provide a segment name for the offerings query' })
    }
  }
}

const updateOffering = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    if (req.params.id) {
      Offering.find({ _id: req.params.id })
        .then(doc => {
          doc.name = req.body.name ? req.body.name : doc.name
          doc.parent_segment = req.body.parent_segment ? req.body.parent_segment : doc.parent_segment
          doc.browser_url = req.body.browser_url ? req.body.browser_url : doc.browser_url
          doc.tablet_thumb_url = req.body.tablet_thumb_url ? req.body.tablet_thumb_url : doc.tablet_thumb_url
          doc.home_screen_thumb_url = req.body.home_screen_thumb_url ? req.body.home_screen_thumb_url : doc.home_screen_thumb_url
          doc.enabled = req.body.enabled != doc.enabled && req.body.enabled != null ? req.body.enabled : doc.enabled
        })
        .catch(err => res.send({ error: 'error occurred updating the offering' }))
    } else {
      res.send({ error: 'please provide an offering id' })
    }
  }

}

export {
  getOfferingByParentSegment
}
