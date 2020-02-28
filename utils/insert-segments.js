const mongoose = require('mongoose')
const Segment = require('../express-routes/models/ApplicationSpecific/Segment')
const csv = require('csv-parser')
const fs = require('fs')
require('dotenv').config()
const results = []
let mongoConnectionString = (
  process.env.ENV == 'local'
  ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-taijg.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
  : `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@127.0.0.1:27017/${process.env.DATABASE}?authSource=admin&retryWrites=true&w=majority`
)

const insertEntry = async item => {
  await Segment.create({ parent_industry: item[0].trim(), name: item[1].trim() })
  console.log(`created ${item[1]} successfully`);
}

const runDBinserts = () => {
  console.log('running db inserts now..')
  fs.createReadStream('segments.txt')
  .pipe(csv({ escape: '\n', headers: false}))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    for (let i = 0; i < results.length; i++) {
      insertEntry(results[i])
    }
  })
}

mongoose.connection.on('connected', () => {
  console.log('connected!')
  runDBinserts()
})
mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
