'use strict'

var data = require('./emoji-data').data
var settings = require('./sheets-settings.js')

function generate (full) {
  var styleStrings = [
    '.emoji-web {\n\tdisplay: inline;\n\tposition: relative;\n\tvertical-align: top;\n\tcursor: text;\n\tborder: none;\n\toutline: none;\n}',
    '.emoji-web:after {\n\tcontent: attr(alt);\n\tdisplay: inline;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\ttext-align: center;\n\tbackground-color: #fff;\n\toverflow: hidden;\n}'
    // '.emoji-web{\n\tfont-size:0;\n\twidth:64px;\n\theight:64px;\n\tdisplay:inline-block;\n\tvertical-align:top;\n}',
    // '.ew32{zoom:0.5}',
    // '.ew24{zoom:0.375}',
    // '.ew16{zoom:0.25}'
  ]

  if (full) {
    var makeClassName = require('./emoji').makeClassName
    for (var j = 0; j < data.length; j++) {
      var count2 = Math.ceil(data[j].length / settings.splitCount)
      var position = 0

      for (var i = 0; i < data[j].length; i++) {
        var page = 0 | i / count2
        position = i - page * count2
        var row = position % settings.cols[j][page]
        var col = 0 | position / settings.cols[j][page]

        var left = row * settings.emojiFullSize + row * settings.add
        var top = col * settings.emojiFullSize + col * settings.add
        // const right = (row + 1) * settings.emojiFullSize + row * settings.add;
        // const bottom = (col + 1) * settings.emojiFullSize + col * settings.add;

        var styleString = '.' + makeClassName(data[j][i]) + '{background:url(\'../sheets/v11_emoji2.0x_' + j + '_' + page + '.png\') -' + left + 'px -' + top + 'px;}'
        styleStrings.push(styleString)
      }
    }
  }

  return styleStrings.join('\n')
}

module.exports = generate
