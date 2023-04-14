const fetch = require('node-fetch');
const secrets = require('./secrets.js');

const HUE_MAX = 290;

// FORECASTPOINTS: the government gives pretty granulat weather data!
// https://api.weather.gov/points/lat,long

async function forecast() {

  let res = await fetch('https://api.weather.gov/gridpoints/' + secrets.gridpointCode + '/forecast/hourly')

  console.log(res)

  return res
}

module.exports = {
  forecast
}