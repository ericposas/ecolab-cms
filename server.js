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
import companyRoutes from './express-routes/routes/ApplicationSpecific/companyRoutes'
import divisionRoutes from './express-routes/routes/ApplicationSpecific/divisionRoutes'

const storage = multer.diskStorage({
  destination: `${__dirname}/uploads`,
  filename: (req, file, cb) => {
    cb(null, `${file.originalname.split('.').slice(0, -1).join('.')}-${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({ storage: storage }) //.single('file')
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
  genid: (req) => uuid(),
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  cookie: MODE == 'development' ? { httpOnly: false } : { secure: true }
}))

app.use(express.static(__dirname+'/public'))
app.use('/uploads', express.static(__dirname+'/uploads'))

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
app.use('/companies', companyRoutes)
app.use('/divisions', divisionRoutes)

// File upload
// app.post('/testupload', upload.single('file'), (req, res, next) => {
//   // console.log(req)
//   res.send({ success: `upload ${req.file.originalname} success!` })
// })
//upload.single('file')

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.session)
  res.send({ success: true, path: `/uploads/${req.file.filename}` })
})

// app.post('/upload', (req, res) => {
//   console.log(req.session)
//   upload(req, res, err => {
//     if (err instanceof multer.MulterError) { return res.status(500).json(err) }
//     else if (err) { return res.status(500).json(err) }
//     // return res.status(200).send(req.file)
//     return res.send({ success: true, path: `/uploads/${req.file.filename}` })
//   })
// })

app.listen(port, err => {
  if (err) throw err
  else console.log('server started in ES6!')
})
