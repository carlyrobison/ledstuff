// require('./secrets.js');
space = require('./peopleinspace.js');
forecastpoints = require('./forecastpoints.js');
// sky = require('./sky.js');
const fetch = require('node-fetch');
// import { weather } from 'weather.js';

const express = require('express')
const app = express()
const port = 3145

app.use(express.static('public'));

app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/public/prettified.html');
})

app.get('/lightarray', async (req, res) => {
  const lightVals = await calculateLightValues()
  res.json(lightVals)
})

app.get('/forecast', async (req, res) => {
  const forecast = await forecastpoints.forecast()
  res.json(forecast)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

async function calculateLightValues() {
  let lightArray = [await space.peopleInSpace()];
  lightArray = lightArray.concat(await forecastpoints.temps());
  return {
    'lights': lightArray
  }
}


