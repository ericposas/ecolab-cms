import User from '../models/User'

const viewUsers = (req, res) => {
  if (process.env.MODE == 'development' ||
      process.env.MODE == 'production' && req.session.auth == true) {
    User.find()
      .then(data => res.send(data))
      .catch(err => console.log(err))
  }
}

const deleteUser = (req, res) => {
  if (req.params.id) {
    User.deleteOne({ _id: req.params.id })
      .then(data => res.send(data))
      .catch(err => console.log(err))
  }
}

export {
  viewUsers,
  deleteUser
}
