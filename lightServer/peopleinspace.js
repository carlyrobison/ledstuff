const fetch = require('node-fetch');

const HUE_MAX = 290;
const MAX_PEOPLE_REASONABLE = 12;

async function peopleInSpace() {
  let res = await fetch('https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json')
    .then(res => res.json());
  return peopleToHSV(res.number)
}

function peopleToHSV(number) {
  const hue = Math.floor(HUE_MAX / MAX_PEOPLE_REASONABLE * Math.min(number, MAX_PEOPLE_REASONABLE));
  return [hue, 100, 100];
}

module.exports = {
  peopleInSpace
}