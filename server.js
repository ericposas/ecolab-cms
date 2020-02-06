import path from 'path'
import cors from 'cors'
import multer from 'multer'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import uuid from 'uuid'
import {
  signup,
  login,
  logout,
  authCheck
} from './express-routes/controllers/loginHandlers'
import userRoutes from './express-routes/routes/userRoutes'
import adminRoutes from './express-routes/routes/adminRoutes'
import passwordResetRoutes from './express-routes/routes/passwordResetRoutes'
// Eco lab specific
import webModuleRoutes from './express-routes/routes/ApplicationSpecific/webModuleRoutes'

const storage = multer.diskStorage({
  destination: `${__dirname}/uploads`,
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}`)
  }
})
const upload = multer({ storage: storage })
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

app.use(cors())
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

app.use(express.static(__dirname+'/public'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.get('/', (req, res) => {
  res.send('Home.')
})

// Password Reset Routes
app.use('/password', passwordResetRoutes)
// Login -- at base URL
app.post('/authCheck', authCheck)
app.post('/login', login)
app.post('/logout', logout)
app.use('/users', userRoutes)
app.use('/admins', adminRoutes)

// Eco Lab Application specific
app.use('/webmodules', webModuleRoutes)

// File upload
app.post('/testupload', upload.single('file'), (req, res, next) => {
  // console.log(req)
  res.send({ success: `upload ${req.file.originalname} success!` })
})
app.post('/upload', upload.single('file'), (req, res) => {
  res.send({ success: true, path: `/uploads/${req.file.filename}` })
})

app.listen(port, err => {
  if (err) throw err
  else console.log('server started in ES6!')
})
