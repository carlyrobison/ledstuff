const fetch = require('node-fetch');
const secrets = require('./secrets.js');

// FORECASTPOINTS: the government gives pretty granulat weather data!
// https://api.weather.gov/points/lat,long
// other endpoints: /offices/{officeId}/headlines'

async function forecast() {

  let res = await fetch('https://api.weather.gov/gridpoints/' + secrets.gridpointCode + '/forecast/hourly')
    .then(res => res.json());

  console.log(res)

  return res
}

module.exports = {
  forecast
}