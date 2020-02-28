const mongoose = require('mongoose')
const Division = require('../express-routes/models/ApplicationSpecific/Division')
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
  let name
  let industries = []
  name = item[0].trim()
  Object.keys(item).forEach((_item, i) => {
    if (i > 0) {
      industries.push(item[_item].trim())
    }
  })
  await Division.create({ name: name, industries: industries })
  console.log(`created ${item} successfully`);
}

const runDBinserts = () => {
  console.log('running db inserts now..')
  fs.createReadStream(__dirname+'/divisions.txt')
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
