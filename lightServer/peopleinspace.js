const fetch = require('node-fetch');

const HUE_MAX = 290;
const MAX_PEOPLE_REASONABLE = 12;

async function peopleInSpace() {
  let status;

  await fetch('https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json')
      .then(res => res.json())
      .then(json => json.number)
      .then(number => peopleToHSV(number))
      .then(res => status = res)

  return status;
}

function peopleToHSV(number) {
  const hue = Math.floor(HUE_MAX / MAX_PEOPLE_REASONABLE * Math.min(number, MAX_PEOPLE_REASONABLE));
  return [hue, 100, 100];
}

module.exports = {
  peopleInSpace
}