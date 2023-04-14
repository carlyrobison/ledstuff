// require('./secrets.js');
space = require('./peopleinspace.js');
forecastpoints = require('./forecastpoints.js');
// sky = require('./sky.js');
const fetch = require('node-fetch');
// import { weather } from 'weather.js';

const express = require('express')
const app = express()
const port = 3145

app.get('/', async (req, res) => {
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
  return {
    'lights': [
    await space.peopleInSpace()
    // await sky.sky()
    ]
  }
}


