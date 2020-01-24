import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import uuid from 'uuid'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
// import router from './express-routes/routes/router'
// import passport from 'passport'
// import passportLocal from 'passport-local'
// const LocalStrategy = passportLocal.Strategy
import User from './express-routes/models/User'
import {
  signup,
  login,
  logout,
  authCheck
} from './express-routes/controllers/loginHandlers'
import userRoutes from './express-routes/routes/userRoutes'

dotenv.config()
const {
  MODE,
  MONGO_USER,
  MONGO_PASSWORD,
} = process.env
const app = express()
const port = process.env.PORT || 3000

mongoose.connection.on('connected', () => {
  console.log('connected!')
})
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-taijg.mongodb.net/ecolab?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.set('trust proxy', 1)
app.use(session({
  genid: (req) => {
    return uuid()
  },
  secret: 'mysecret',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {}
  // cookie: MODE == 'development' ? {} : { secure: true }
  // cookie: { secure: true }
}))
// const forgot = require('password-reset')({
//   uri: `http://localhost:${port}/password_reset`,
//   from: 'password-robot@localhost',
//   host: 'localhost',
//   port: 25,
// })
// app.use(forgot.middleware)
app.use(express.static(__dirname+'/public'))

const sendMail = async (res, email, code) => {
  let testAccount = await nodemailer.createTestAccount()
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
  // console.log('message sent!')
  res.send({ success: 'message sent!' })
}

// admin will initiate a password reset by inputting the user's email
app.post('/password/forgot', (req, res) => {
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

  //let code = uuid()
  // sendMail(res, email, code).catch(console.error)
})

// route to the user -- pass in form data
app.post('/password/code', (req, res) => {
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
  // if (!req.session.reset) return res.end('reset token not set')
  // let password = req.body.password
  // let confirm = req.body.confirm
  // if (password !== confirm) return res.end('passwords do not match')
})

// pass in form data
app.post('/password/update', (req, res) => {
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
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.get('/', (req, res) => {
  res.send('Home.')
})

// Login -- at base URL
app.post('/authCheck', authCheck)
app.post('/login', login)
app.post('/logout', logout)

app.use('/users', userRoutes)

app.listen(port, err => {
  if (err) throw err
  else console.log('server started in ES6!')

})
