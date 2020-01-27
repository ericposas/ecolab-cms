import uuid from 'uuid'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import User from '../models/User'

const sendMail = async (res, email, code) => {
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
    from: 'Test <sector5developer@gmail.com>',
    to: email,
    subject: 'Testing',
    text: 'Testing testing',
    html: `
      <div>Copy/paste password reset code:<div>
      <b>${code}</b>
    `
  })
  res.send({ success: 'message sent!' })
}

const forgot = (req, res) => {
  let email = req.body.email
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
}

const code = (req, res) => {
  let submittedCode = req.body.code.trim()
  User.findOne({ resetCode: submittedCode })
    .then(doc => {
      if (doc == null) {
        res.send({ error: 'invalid code' })
      } else {
        req.session.name = doc.name
        if (submittedCode == doc.resetCode) {
          res.send({ success: 'allow user to reset password -- redirect to password reset page' })
        } else {
          res.send({ error: 'incorrect data supplied' })
        }
      }
    })
    .catch(err => console.log(err))
}

const update = (req, res) => {
  // update the user db object here
  const updatePass = hashedPass => {
    User.findOne({ name: req.session.name })
      .then(doc => {
        console.log(doc)
        // expire the reset code and delete session variable
        delete req.session.name
        doc.resetCode = null
        doc.password = hashedPass
        doc.save(err => {
          if (err) res.send({ error: 'update password failed.' })
          else res.send({ success: 'password has been reset' })
        })
      })
      .catch(err => console.log(err))
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
  update
}
