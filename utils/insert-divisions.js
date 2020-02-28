const mongoose = require('mongoose')
const Division = require('../express-routes/models/ApplicationSpecific/Division')
const csv = require('csv-parser')
const fs = require('fs')
require('dotenv').config()
const results = [];

const insertEntry = async item => {
  await Division.create({ name: item[0].trim(), industries: item.filter((item, idx) => idx != 0) })
  console.log(`created ${item[1]} successfully`);
}

const runDBinserts = () => {
  console.log('running db inserts now..')
  fs.createReadStream('divisions.txt')
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
mongoose.connect(`mongodb+srv://root:root@cluster0-taijg.mongodb.net/ecolab?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

console.log(process.env.MONGO_USER)
