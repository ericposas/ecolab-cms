import WebModule from '../../models/ApplicationSpecific/WebModule'

const createWebModule = (req, res) => {
  if (req.body.browser_url) {
    WebModule({ browser_url: req.body.browser_url })
      .save()
      .then(() => res.send({ success: 'web module document saved!' }))
      .catch(err => res.send({ error: 'could not save web module' }))
  } else {
    res.send({ error: 'no web module url provided' })
  }
}

const viewWebModules = (req, res) => {
  WebModule.find()
    .then(results => res.send(results))
    .catch(err => res.send({ error: 'could not fetch data' }))
}

const deleteWebModule = (req, res) => {
  if (req.params.id) {
    let id = req.params.id
    WebModule.deleteOne({ _id: id })
      .then(doc => res.send({ success: id + ' successfully deleted.' }))
      .catch(err => res.send({ error: 'db error' }))
  } else {
    res.send({ error: 'no object id provided' })
  }
}

export {
  createWebModule,
  viewWebModules,
  deleteWebModule,
}
