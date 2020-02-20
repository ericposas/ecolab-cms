import Industry from '../../models/ApplicationSpecific/Industry'

const getIndustries = (req, res) => {
  if (!req.session.appuserauth) res.send({ error: 'not authorized' })
  else {
    Industry.find()
      .then(data => res.send({ success: data }))
      .catch(err => res.send({ error: 'error occurred getting industry data' }))
  }
}

export {
  getIndustries,

}
