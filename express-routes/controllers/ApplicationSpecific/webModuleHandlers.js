import WebModule from '../../models/ApplicationSpecific/WebModule'

const createWebModule = (req, res) => {
  if (req.body.browser_url) {
    WebModule({ browser_url: req.body.browser_url })
      .save()
      .then(() => res.send({ success: 'web module document saved!' }))
      .catch(err => console.log(err))
  }
}

const viewWebModules = (req, res) => {
  WebModule.find()
    .then(results => res.send(results))
    .catch(err => console.log(err))
}

export {
  createWebModule,
  viewWebModules,
}
