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

const light = [
  "Consumer Packaged Goods",
  "Beverage Processing",
  "Dairy Processing",
  "Meat Poultry and Seafood Processing",
  "Brewery & Winery",
  "Grain & Oilseed Processing",
  "Biofuels & Ethanol",
  "Sugar Processing",
  "Mech/Elec/Eqt Mfg.",
  "Plastic Products",
  "General Manufacturing",
  "Pharmaceutical",
  "Corrugated Box",
  "Wood Products",
  "General Electronics",
  "Microelectronics",
  "Rail Transportation",
  "Aerospc Defense Mfg",
  "Automotive",
  "Tire & Rubber Products",
  "Agricultural & Construction Equipment",
  "Commercial Buildings",
  "New Construction",
  "Education Facilities",
  "Hospitals & Health",
  "Hotels and Resorts",
  "District Energy",
  "General Gov't",
  "Long Term Care Facil",
  "Data Centers",
  "Casinos",
]
const heavy = [
  "Coal Fired",
  "Gas Fired",
  "Geothermal",
  "Nuclear",
  "Industrial Gases",
  "Ammonia & Fertilizer",
  "Specialty Chemicals",
  "Aluminum",
  "Steel Mills",
  "Investment Casting"
]
let industries = { light: light, heavy: heavy }
let offerings = {
  light: [ 'Water Safety Intelligence', 'Water Quality (Light)', 'Financial Impact' ],
  heavy: [ 'OMNI', 'Water Quality (Heavy)', 'Financial Impact' ]
}
// let status = { light: '', heavy: '' }

const insertEntry = async (offering, arrStrName, idx) => {
  await Offering.create({
    name: offering,
    parent_segment: industries[arrStrName][idx],
  })
  console.log(`created ${offering} successfully`);
}

const runDBinserts = (type_lightOrHeavy) => {
  console.log(`running db inserts now for ${type_lightOrHeavy}..`)
  for (let j = 0; j < 3; j++) {
    let offering = offerings[type_lightOrHeavy][j]
    for (let i = 0; i < light.length; i++) {
      insertEntry(offering, type_lightOrHeavy, i)
    }
  }
}

mongoose.connection.on('connected', () => {
  console.log('connected!')
  runDBinserts('light')
  runDBinserts('heavy')
})
mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })

console.log(process.env)
