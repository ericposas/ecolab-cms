const mongoose = require('mongoose')
const Offering = require('../express-routes/models/ApplicationSpecific/Offering')
const csv = require('csv-parser')
const fs = require('fs')
require('dotenv').config()

let mongoConnectionString = (
  process.env.ENV == 'local'
  ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-taijg.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
  : `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@127.0.0.1:27017/${process.env.DATABASE}?authSource=admin&retryWrites=true&w=majority`
)
console.log(mongoConnectionString)

let offerings = [
  { divisions: ['light'], name: 'Water Safety Intelligence' },
  { divisions: ['light'], name: 'Water Quality (Light)' },
  { divisions: ['light'], name: 'Water Quality (Heavy)' },
  { divisions: ['light', 'heavy'], name: 'Financial Impact' },
  { divisions: ['light'], name: 'OMNI' }
]

const insertEntry = async offering => {
  await Offering.create({
    name: offering.name,
    divisions: offering.divisions
  })
  console.log(`created ${offering} successfully`);
}

const runDBinserts = () => {
  for (let i = 0; i < offerings.length; i++) {
    insertEntry(offerings[i])
  }
}

mongoose.connection.on('connected', () => {
  console.log('connected!')
  runDBinserts()
})
mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })

console.log(process.env)
