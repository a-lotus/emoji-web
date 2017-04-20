var fs = require('fs')
var css = require('./js/style-generator.js')()
var positions = require('./js/image-positions.js')()

fs.mkdir('css', function () {
  fs.writeFile('./css/emoji-web.css', css)
})

fs.mkdir('data', function () {
  fs.writeFile('./data/positions.js', '"use strict";\nObject.defineProperty(exports, "__esModule", {\n\tvalue: true\n});\nmodule.exports = ' + JSON.stringify(positions))
})
