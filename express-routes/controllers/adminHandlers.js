import Admin from '../models/Admin'

const getAdmins = (req, res) => {
  if (req.session.auth) {
    Admin.find()
      .then(data => res.send(data))
      .catch(err => console.log(err))
  }
}

const deleteAdmin = (req, res) => {
  if (req.params.id) {
    Admin.deleteOne({ _id: req.params.id })
      .then(data => res.send(data))
      .catch(err => console.log(err))
  }
}

export {
  getAdmins,
  deleteAdmin,
}
