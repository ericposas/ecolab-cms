const mongoose = require('mongoose')
const Segment = require('../express-routes/models/ApplicationSpecific/Segment')
const csv = require('csv-parser')
const fs = require('fs')
require('dotenv').config()
const results = [];

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
    // console.log(results)
    for (let i = 0; i < results.length; i++) {
      insertEntry(results[i])
    }
  })
}

mongoose.connection.on('connected', () => {
  console.log('connected!')
  runDBinserts()
})
mongoose.connect(`mongodb+srv://root:root@cluster0-taijg.mongodb.net/ecolab?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

console.log(process.env.MONGO_USER)
