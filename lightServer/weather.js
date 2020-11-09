const fetch = require('node-fetch');
const querystring = require('querystring');
require('./secrets.js');

let fields = ['temp', 'wind_speed', 'precipitation', 'cloud_cover', 
              'moon_phase', 'weather_code'];
let url = 'https://api.climacell.co/v3/weather/realtime';
let query_string = {
  unit_system: 'us',
  fields: fields.join(','),
  lat: "37.76",
  lon: "-122.42"
}
let options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json', 'apikey': CLIMACELL_API_KEY },
};

function getWeatherData() {
  return fetch(url + '?' + querystring.encode(query_string), options)
    .then(res => res.json())
    .then(json => formatWeatherdata(json))
}

function formatWeatherData(json) {
  return json //TODO
}

function tempToHSV(temp) {

}

function 
