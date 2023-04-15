const fetch = require('node-fetch');
const secrets = require('./secrets.js');
const colors = require('./colors.js');

// FORECASTPOINTS: the government gives pretty granulat weather data!
// https://api.weather.gov/points/lat,long
// other endpoints: /offices/{officeId}/headlines'

async function forecast() {

  let res = await fetch('https://api.weather.gov/gridpoints/' + secrets.gridpointCode + '/forecast/hourly')
    .then(res => res.json());

  console.log(res)
  return res
}

async function temps() {
    let res = await fetch('https://api.weather.gov/gridpoints/' + secrets.gridpointCode)
        .then(res => res.json());
    let leds;
    console.log()
    return res["properties"]["temperature"]["values"].map(tempC => colors.numberToHSV('TempF', (9.0 * tempC["value"] / 5.0) + 32.0))
}

module.exports = {
  forecast,
  temps
}