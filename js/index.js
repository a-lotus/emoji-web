'use strict';

var _emojiData = require('./emoji-data');

var EmojiData = _interopRequireWildcard(_emojiData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import blabla from './style-generator'

// const emojiData = new EmojiData();

console.dir(EmojiData); // import { emojiToFE0F, dataChars, emojiSecret, emojiColored, dataColored, data, emojiToFE0FMap, dataCharsMap, emojiColoredMap } from './emoji-data'

console.log('window.ed now contains EmojiData object');
window.ed = EmojiData;