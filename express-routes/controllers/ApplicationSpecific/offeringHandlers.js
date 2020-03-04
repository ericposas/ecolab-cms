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

export {
  getOfferingByParentSegment
}
