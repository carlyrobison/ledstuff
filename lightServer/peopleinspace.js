const fetch = require('node-fetch');
const colors = require('./colors.js');

async function peopleInSpace() {
  let res = await fetch('https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json')
    .then(res => res.json());
  return colors.numberToHSV("PeopleInSpace", res.number)
}

module.exports = {
  peopleInSpace
}