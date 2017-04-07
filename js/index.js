'use strict';

var EmojiData = require('./emoji-data.js');
var emoji = require('./emoji');
// var styles = require('../css/emoji-web.css');

Object.defineProperty(exports, "__esModule", {
	value: true
});

// data
exports.data = EmojiData.data;
exports.dataColored = EmojiData.dataColored;
exports.emojiColored = EmojiData.emojiColored;
exports.emojiSecret = EmojiData.emojiSecret;

// functions
exports.utfMark = emoji.utfMark;
exports.makeClassName = emoji.makeClassName;
exports.fixEmoji = emoji.fixEmoji;
exports.replaceEmoji = emoji.replaceEmoji;
exports.availableSizes = emoji.availableSizes;

// classname
exports.ewClassName = emoji.ewClassName;