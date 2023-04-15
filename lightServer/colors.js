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

function numberToHSV(data, number) {
    switch(data) {
        case 'PeopleInSpace':
            return peopleToHSV(number);
        default:
            return [0, 0, 0];
    }
}

module.exports = {
    numberToHSV
}
