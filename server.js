import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import uuid from 'uuid'
// import router from './express-routes/routes/router'
// import passport from 'passport'
// import passportLocal from 'passport-local'
// const LocalStrategy = passportLocal.Strategy
import User from './express-routes/models/User'
import dataRoutes from './express-routes/routes/dataRoutes'

dotenv.config()
const {
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
  // cookie: { secure: true }
}))

app.use(express.static(__dirname+'/public'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'))
})

// app.get('/', (req, res) => res.send('test'))

// app.use('/test', router)

app.use('/', dataRoutes)

app.listen(port, err => {
  if (err) throw err
  else console.log('server started in ES6!')

})
