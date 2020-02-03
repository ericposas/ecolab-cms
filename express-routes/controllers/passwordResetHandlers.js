import uuid from 'uuid'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import User from '../models/User'
import Admin from '../models/Admin'

const sendMail = async (res, email, code, cb, name, adminBool) => {
  // let testAccount = await nodemailer.createTestAccount()
  let transporter = nodemailer.createTransport({
    // host: 'sector5digital-com.mail.protection.outlook.com',
    service: 'gmail',
    auth: {
      user: 'sector5developer',
      pass: process.env.EMAIL_PASS
    },
    port: 587,
    secure: false,
  })
  let info = await transporter.sendMail({
    from: 'Password Reset <sector5developer@gmail.com>',
    to: email,
    subject: `${adminBool ? 'Admin' : 'User' } password reset ${name ? 'for ' + name : null}`,
    text: 'Please reset your password',
    html: `
      ${ adminBool ? 'Admin ' : 'User ' } ${ name ? name : null }
      <div>Copy/paste password reset code to login:<div>
      <b>${code}</b>
    `
  })
  if (cb) cb()
  else res.send({ success: 'message sent!' })
}

const forgot = (req, res) => {
  let email = req.body.email
  if (!req.body.admin) {
    User.findOne({ email: email })
      .then(doc => {
        if (doc && doc.name) {
          console.log(doc)
          let code = uuid()
          doc.resetCode = code
          doc.save(err => {
            if (err) res.send({ error: 'error occurred setting reset code in User object' })
            else sendMail(res, email, code).catch(console.error)
          })
        } else {
          res.send({ error: 'no user identified by that email address' })
        }
      })
      .catch(err => console.log(err))
  } else {
    Admin.findOne({ email: email })
      .then(doc => {
        if (doc && doc.name) {
          let code = uuid()
          doc.resetCode = code
          doc.save(err => {
            if (err) res.send({ error: 'error occurred setting reset code in Admin object' })
            else sendMail(res, email, code).catch(console.error)
          })
        } else {
          res.send({ error: 'no admin identified by that email address' })
        }
      })

  }
}

const code = (req, res, cb) => {
  let submittedCode = req.body.password.trim()
  if (!req.body.admin) {
    User.findOne({ resetCode: submittedCode })
      .then(doc => {
        if (doc == null) {
          res.send({ error: 'invalid code' })
        } else {
          if (submittedCode == doc.resetCode) {
            req.session.appusername = doc.name
            req.session.appuseremail = doc.email
            if (cb) cb()
            else res.send({ success: 'allow user to reset password -- redirect to password reset page' })
          } else {
            res.send({ error: 'incorrect data supplied' })
          }
        }
      })
      .catch(err => console.log(err))
  } else {
    Admin.findOne({ resetCode: submittedCode })
      .then(doc => {
        if (doc == null) {
          res.send({ error: 'code invalid' })
        } else {
          if (submittedCode == doc.resetCode) {
            req.session.name = doc.name
            req.session.email = doc.email
            if (cb) cb()
            else res.send({ success: 'allow admin to reset password -- redirect to password reset page' })
          } else {
            res.send({ error: 'incorrect data supplied' })
          }
        }
      })
  }
}

const update = (req, res) => {
  // update the user db object here
  const updatePass = hashedPass => {
    if (!req.body.admin) {
      User.findOne({ name: req.session.appusername, email: req.session.appuseremail })
        .then(doc => {
          console.log(doc)
          // expire the reset code and delete session variable
          delete req.session.appusername
          delete req.session.appuseremail
          doc.resetCode = null
          doc.password = hashedPass
          doc.save(err => {
            if (err) res.send({ error: 'update password failed.' })
            else res.send({ success: 'password has been reset' })
          })
        })
        .catch(err => console.log(err))
    } else {
      Admin.findOne({ name: req.session.name, email: req.session.email })
      .then(doc => {
        console.log(doc)
        // expire the reset code and delete session variable
        delete req.session.name
        delete req.session.email
        doc.resetCode = null
        doc.password = hashedPass
        doc.save(err => {
          if (err) res.send({ error: 'update to admin password failed.' })
          else res.send({ success: 'admin password has been reset' })
        })
      })
      .catch(err => console.log(err))
    }
  }
  let saltRounds = 10
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      updatePass(hash)
    })
  })
}

export {
  forgot,
  code,
  update,
  sendMail
}
