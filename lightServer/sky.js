const fetch = require('node-fetch');
const { JSDOM } = require('jsdom')
const colors = require('colors.js');

function sky() {
  return fetch("http://whatcoloristhesky.today/in/sf/")
    .then(res => res.text())
    .then(body => extractHex(body))
    .then(hex => colors.hex2hsv(hex))
}

function extractHex(body) {
  const dom = new JSDOM(body);
  return dom.window.document.querySelector('#hex strong').innerHTML;
}
