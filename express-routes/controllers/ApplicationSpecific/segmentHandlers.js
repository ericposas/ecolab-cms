import Segment from '../../models/ApplicationSpecific/Segment'

const getSegments = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    Segment.find()
      .then(data => res.send({ success: data }))
      .catch(err => res.send({ error: 'error occurred getting segment data' }))
  }
}

export {
  getSegments,

}
