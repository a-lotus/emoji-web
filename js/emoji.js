'use strict'

var EmojiData = require('./emoji-data.js')
var imagePositions = require('../data/positions.js')
var settings = require('./sheets-settings.js')
var blankPath = require('../blank.gif')
var styles = require('../css/emoji-web.css')
var ewClassName = styles && styles['emoji-web'] ? styles['emoji-web'] : 'emoji-web'

var imgPaths = Object.create(null)
imgPaths['00'] = require('../sheets/v11_emoji2.0x_0_0.png')
imgPaths['13'] = require('../sheets/v11_emoji2.0x_1_3.png')
imgPaths['32'] = require('../sheets/v11_emoji2.0x_3_2.png')
imgPaths['01'] = require('../sheets/v11_emoji2.0x_0_1.png')
imgPaths['20'] = require('../sheets/v11_emoji2.0x_2_0.png')
imgPaths['33'] = require('../sheets/v11_emoji2.0x_3_3.png')
imgPaths['02'] = require('../sheets/v11_emoji2.0x_0_2.png')
imgPaths['21'] = require('../sheets/v11_emoji2.0x_2_1.png')
imgPaths['40'] = require('../sheets/v11_emoji2.0x_4_0.png')
imgPaths['03'] = require('../sheets/v11_emoji2.0x_0_3.png')
imgPaths['22'] = require('../sheets/v11_emoji2.0x_2_2.png')
imgPaths['41'] = require('../sheets/v11_emoji2.0x_4_1.png')
imgPaths['10'] = require('../sheets/v11_emoji2.0x_1_0.png')
imgPaths['23'] = require('../sheets/v11_emoji2.0x_2_3.png')
imgPaths['42'] = require('../sheets/v11_emoji2.0x_4_2.png')
imgPaths['11'] = require('../sheets/v11_emoji2.0x_1_1.png')
imgPaths['30'] = require('../sheets/v11_emoji2.0x_3_0.png')
imgPaths['43'] = require('../sheets/v11_emoji2.0x_4_3.png')
imgPaths['12'] = require('../sheets/v11_emoji2.0x_1_2.png')
imgPaths['31'] = require('../sheets/v11_emoji2.0x_3_1.png')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.utfMark = utfMark
exports.makeClassName = makeClassName
exports.fixEmoji = fixEmoji
exports.replaceEmoji = replaceEmoji
exports.ewClassName = ewClassName

function utfMark (char) {
  var utfNumbers = new Array(char.length)
  for (var i = 0; i < char.length; i++) {
    utfNumbers[i] = char.charCodeAt(i).toString(16)
  }
  return utfNumbers.join('-')
}

function makeClassName (char) {
  return 'ew' + utfMark(char)
}

function fixEmoji (emoji) {
  var ch
  var lenght = emoji.length
  for (var a = 0; a < lenght; a++) {
    ch = emoji.charCodeAt(a)
    if (ch >= 0xD83C && ch <= 0xD83E) {
      if (ch === 0xD83C && a < lenght - 1) {
        ch = emoji.charAt(a + 1)
        if (ch === 0xDE2F || ch === 0xDC04 || ch === 0xDE1A || ch === 0xDD7F) {
          emoji = emoji.substring(0, a + 2) + '\uFE0F' + emoji.substring(a + 2)
          lenght++
          a += 2
        } else {
          a++
        }
      } else {
        a++
      }
    } else if (ch === 0x20E3) {
      return emoji
    } else if (ch >= 0x203C && ch <= 0x3299) {
      if (EmojiData.emojiToFE0FMap.hasOwnProperty(ch)) {
        emoji = emoji.substring(0, a + 1) + '\uFE0F' + emoji.substring(a + 1)
        lenght++
        a++
      }
    }
  }
  return emoji
}

function replaceEmoji (cs, size, className, emojiOnly) {
  if (cs == null || cs.length === 0) {
    return cs
  }

  size = parseInt(size)
  // if (isNaN(size) || availableSizes.indexOf(size) === -1) {
  if (isNaN(size)) {
    size = 64
  }
  var scale = size / 64

  var clssnm = typeof className === 'string' ? ewClassName + ' ' + className.trim() : ewClassName

  function htmlTemplate (emojiCode) {
    var p = imagePositions[emojiCode]
    return '<img src="' + blankPath + '" class="' + clssnm + '" alt="' + emojiCode + '" ' +
'style="height: ' + size + 'px; width: ' + size + 'px; background: url(' + imgPaths['' + p[0] + p[1]] + ') -' + p[2] * scale + 'px -' + p[3] * scale + 'px / ' + settings.cols[p[0]][p[1]] * (settings.emojiFullSize + settings.add) * scale + 'px;" draggable="false"/>'
  }

  var a, c, i, next
  var buf = 0
  var length = cs.length
  var startIndex = -1
  var startLength = 0
  var previousGoodIndex = 0

  var emojiCode = ''
  var doneEmoji = false
  var s = Array(length)
  for (i = 0; i < length; i++) {
    s[i] = cs.charAt(i)
  }

  try {
    for (i = 0; i < length; i++) {
      c = cs.charCodeAt(i)
      if ((c >= 0xD83C && c <= 0xD83E) || (buf !== 0 && ((buf & 0xFFFFFFFF00000000) === 0) && ((buf & 0xFFFF) === 0xD83C) && (c >= 0xDDE6 && c <= 0xDDFF))) {
        if (startIndex === -1) {
          startIndex = i
        }
        emojiCode += String.fromCharCode(c)
        startLength++
        buf <<= 16
        buf |= c
      } else if (emojiCode.length > 0 && (c === 0x2640 || c === 0x2642 || c === 0x2695)) {
        emojiCode += String.fromCharCode(c)
        startLength++
        buf = 0
        doneEmoji = true
      } else if (buf > 0 && ((c & 0xF000) === 0xD000)) {
        emojiCode += String.fromCharCode(c)
        startLength++
        buf = 0
        doneEmoji = true
      } else if (c === 0x20E3) {
        if (i > 0) {
          var c2 = cs.charAt(previousGoodIndex)
          if ((c2 >= '0' && c2 <= '9') || c2 === '#' || c2 === '*') {
            startIndex = previousGoodIndex
            startLength = i - previousGoodIndex + 1
            emojiCode += c2
            emojiCode += String.fromCharCode(c)
            doneEmoji = true
          }
        }
      } else if ((c === 0x00A9 || c === 0x00AE || (c >= 0x203C && c <= 0x3299)) && EmojiData.dataCharsMap.hasOwnProperty(c)) {
        if (startIndex === -1) {
          startIndex = i
        }
        startLength++
        emojiCode += String.fromCharCode(c)
        doneEmoji = true
      } else if (startIndex !== -1) {
        emojiCode = ''
        startIndex = -1
        startLength = 0
        doneEmoji = false
      } else if (c !== 0xfe0f) {
        if (emojiOnly != null) {
          emojiOnly[0] = 0
          emojiOnly = null
        }
      }
      if (doneEmoji && i + 2 < length && cs.charCodeAt(i + 1) === 0xD83C) {
        next = cs.charCodeAt(i + 2)
        if (next >= 0xDFFB && next <= 0xDFFF) {
          emojiCode += cs.substring(i + 1, i + 3)
          startLength += 2
          i += 2
        }
      }
      previousGoodIndex = i
      for (a = 0; a < 3; a++) {
        if (i + 1 < length) {
          c = cs.charCodeAt(i + 1)
          if (a === 1) {
            if (c === 0x200D && emojiCode.length > 0) {
              emojiCode += cs.charAt(i + 1)
              i++
              startLength++
              doneEmoji = false
            }
          } else {
            if (c >= 0xFE00 && c <= 0xFE0F) {
              i++
              startLength++
            }
          }
        }
      }
      if (doneEmoji && i + 2 < length && cs.charCodeAt(i + 1) === 0xD83C) {
        next = cs.charCodeAt(i + 2)
        if (next >= 0xDFFB && next <= 0xDFFF) {
          emojiCode += cs.substring(i + 1, i + 3)
          startLength += 2
          i += 2
        }
      }
      if (doneEmoji) {
        if (emojiOnly != null) {
          emojiOnly[0]++
        }

        for (a = 1; a < startLength; a++) {
          s[startIndex + a] = null
        }
        s[startIndex] = htmlTemplate(emojiCode)

        startLength = 0
        startIndex = -1
        emojiCode = ''
        doneEmoji = false
      }
    }
  } catch (e) {
    if (typeof console === 'object') console.log('[emoji-web] Exception', e)
    return cs
  }
  return s.join('')
}
