const HUE_MAX = 290;
const MAX_PEOPLE_REASONABLE = 12;

// Taken from the internet: https://www.30secondsofcode.org/js/s/rgb-to-hsb/
const RGBToHSB = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const v = Math.max(r, g, b),
      n = v - Math.min(r, g, b);
    const h =
      n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
    return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
  };
//   RGBToHSB(252, 111, 48);
  // [18.529411764705856, 80.95238095238095, 98.82352941176471]

function peopleToHSV(number) {
    const hue = Math.floor(HUE_MAX / MAX_PEOPLE_REASONABLE * Math.min(number, MAX_PEOPLE_REASONABLE));
    return [hue, 100, 100];
}

// This looks bad, but it's because it's descriptively taken from https://www.weather.gov/forecastpoints
function tempFtoRGB(number) {
  if (number >= 65) { return [100, 100, 100] }
  if (number >= 60) { return [161, 217, 155] }  // light green
  if (number >= 55) { return [116, 196, 118] }  // darker green
  if (number >= 50) { return [49, 163, 84] }    // deeper green
  if (number >= 45) { return [6, 104, 44] }
  if (number >= 40) { return [18, 87, 87] }  // grayish blue
  if (number >= 35) { return [0, 153, 150] }
  if (number >= 30) { return [48, 207, 194] } 
  if (number >= 25) { return [173, 255, 255] }
  if (number >= 20) { return [115, 215, 255] } 
  if (number >= 15) { return [74, 199, 255] }
  return [100, 100, 100];
}

function numberToHSV(data, number) {
    switch(data) {
        case 'PeopleInSpace':
            return peopleToHSV(number);
        case 'TempF':
          return tempFtoRGB(number);
        default:
            return [0, 0, 0];
    }
}

module.exports = {
    numberToHSV
}
