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
import industryRoutes from './express-routes/routes/ApplicationSpecific/industryRoutes'
import segmentRoutes from './express-routes/routes/ApplicationSpecific/segmentRoutes'
import tourModuleRoutes from './express-routes/routes/ApplicationSpecific/tourModuleRoutes'
import customModuleRoutes from './express-routes/routes/ApplicationSpecific/customModuleRoutes'

const storage = multer.diskStorage({
  destination: `${__dirname}/uploads`,
  filename: (req, file, cb) => {
    cb(null, `${file.originalname.split('.').slice(0, -1).join('.')}-${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({ storage: storage })
dotenv.config()
const {
  ENV,
  NODE_ENV,
  MONGO_USER,
  MONGO_PASSWORD,
  DATABASE,
} = process.env
const app = express()
const port = process.env.PORT || 3000

mongoose.connection.on('connected', () => {
  console.log('connected!')
})

let mongoConnectionString = (
  ENV == 'local'
  ? `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-taijg.mongodb.net/ecolab?retryWrites=true&w=majority`
  : `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@127.0.0.1:27017/ecolab?authSource=admin&retryWrites=true&w=majority`
)
mongoose.connect(mongoConnectionString, {
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
  resave: true,
  rolling: true,
  saveUninitialized: true,
  cookie: NODE_ENV == 'development' ? { httpOnly: false } : { secure: true }
}))

app.use(express.static(__dirname+'/public'))
app.use('/uploads', express.static(__dirname+'/uploads'))

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
app.use('/tourmodules', tourModuleRoutes)
app.use('/custommodules', customModuleRoutes)
// Divisions, Industries, Segments
app.use('/divisions', divisionRoutes)
app.use('/industries', industryRoutes)
app.use('/segments', segmentRoutes)

// File upload
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.session)
  res.send({ success: true, path: `/uploads/${req.file.filename}` })
})

app.listen(port, err => {
  if (err) throw err
  else console.log('server started in ES6!')
})
