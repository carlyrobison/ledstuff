// require('./secrets.js');
space = require('./peopleinspace.js');
// sky = require('./sky.js');
const fetch = require('node-fetch');
// import { weather } from 'weather.js';

const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  const lightVals = await calculateLightValues()
  res.json(lightVals)
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


