const fetch = require('node-fetch');
const { JSDOM } = require('jsdom')
const colors = require('colors.js');

async function sky() {
  let status;

  // THIS WEBSITE IS _VERY_ SLOW
  await fetch("http://whatcoloristhesky.today/in/sf/")
    .then(res => res.text())
    .then(body => extractHex(body))
    .then(hex => colors.hex2hsv(hex))
    .then(res => console.log(res))
    .then(res => status = res)
  return status
}

function extractHex(body) {
  const dom = new JSDOM(body);
  return dom.window.document.querySelector('#hex strong').innerHTML;
}

module.exports = {
  sky
}