'use strict';

var EmojiData = require('./emoji-data.js');

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.utfMark = utfMark;
exports.makeClassName = makeClassName;
exports.unifiedToHTML = unifiedToHTML;
exports.fixEmoji = fixEmoji;
exports.replaceEmoji = replaceEmoji;
var availableSizes = exports.availableSizes = [16, 24, 32, 64];

function utfMark(char) {
	var utfNumber = char.charCodeAt(0).toString(16);
	if (char.length == 2) {
		return utfNumber + '-' + char.charCodeAt(1).toString(16);
	}
	return utfNumber;
}

function makeClassName(char) {
	return 'ew' + utfMark(char);
}

function unifiedToHTML(text) {
	return text.replace(jEmoji.EMOJI_RE(), function (_, m) {
		var em = EMOJI_MAP[m];
		return '<span class="emoji emoji' + em[2] + '" title="' + em[1] + '"></span>';
	});
}

function fixEmoji(emoji) {
	var ch;
	var lenght = emoji.length;
	for (var a = 0; a < lenght; a++) {
		ch = emoji.charCodeAt(a);
		if (ch >= 0xD83C && ch <= 0xD83E) {
			if (ch == 0xD83C && a < lenght - 1) {
				ch = emoji.charAt(a + 1);
				if (ch == 0xDE2F || ch == 0xDC04 || ch == 0xDE1A || ch == 0xDD7F) {
					emoji = emoji.substring(0, a + 2) + "\uFE0F" + emoji.substring(a + 2);
					lenght++;
					a += 2;
				} else {
					a++;
				}
			} else {
				a++;
			}
		} else if (ch == 0x20E3) {
			return emoji;
		} else if (ch >= 0x203C && ch <= 0x3299) {
			if (EmojiData.emojiToFE0FMap.hasOwnProperty(ch)) {
				emoji = emoji.substring(0, a + 1) + "\uFE0F" + emoji.substring(a + 1);
				lenght++;
				a++;
			}
		}
	}
	return emoji;
}

function replaceEmoji(cs, size, className, emojiOnly) {
	if (cs == null || cs.length == 0) {
		return cs;
	}
	size = parseInt(size);
	if (isNaN(size) || availableSizes.indexOf(size) === -1) {
		size = 64;
	}
	var sizeClassName = size === 64 ? '' : 'ew'+size+' ';
	var additionalClassName = typeof className === 'string' ? ' '+className.trim() : '';

	var c;
	var buf = 0;
	var length = cs.length;
	var startIndex = -1;
	var startLength = 0;
	var previousGoodIndex = 0;

	var emojiCode = '';
	var doneEmoji = false;
	var s = Array(length);
	for (var i = 0; i < length; i++) {
		s[i] = cs.charAt(i);
	}

	try {
		for (var i = 0; i < length; i++) {
			c = cs.charCodeAt(i);
			if (c >= 0xD83C && c <= 0xD83E || (buf != 0 && (buf & 0xFFFFFFFF00000000) == 0 && (buf & 0xFFFF) == 0xD83C && (c >= 0xDDE6 && c <= 0xDDFF))) {
				if (startIndex == -1) {
					startIndex = i;
				}
				emojiCode += String.fromCharCode(c);
				startLength++;
				buf <<= 16;
				buf |= c;
			} else if (emojiCode.length > 0 && (c == 0x2640 || c == 0x2642 || c == 0x2695)) {
				emojiCode += String.fromCharCode(c);
				startLength++;
				buf = 0;
				doneEmoji = true;
			} else if (buf > 0 && (c & 0xF000) == 0xD000) {
				emojiCode += String.fromCharCode(c);
				startLength++;
				buf = 0;
				doneEmoji = true;
			} else if (c == 0x20E3) {
				if (i > 0) {
					var c2 = cs.charAt(previousGoodIndex);
					if ((c2 >= '0' && c2 <= '9') || c2 == '#' || c2 == '*') {
						startIndex = previousGoodIndex;
						startLength = i - previousGoodIndex + 1;
						emojiCode += c2;
						emojiCode += String.fromCharCode(c);
						doneEmoji = true;
					}
				}
			} else if ((c == 0x00A9 || c == 0x00AE || c >= 0x203C && c <= 0x3299) && EmojiData.dataCharsMap.hasOwnProperty(c)) {
				if (startIndex == -1) {
					startIndex = i;
				}
				startLength++;
				emojiCode += String.fromCharCode(c);
				doneEmoji = true;
			} else if (startIndex != -1) {
				emojiCode = '';
				startIndex = -1;
				startLength = 0;
				doneEmoji = false;
			} else if (c != 0xfe0f) {
				if (emojiOnly != null) {
					emojiOnly[0] = 0;
					emojiOnly = null;
				}
			}
			if (doneEmoji && i + 2 < length && cs.charCodeAt(i + 1) == 0xD83C) {
				var next = cs.charCodeAt(i + 2);
				if (next >= 0xDFFB && next <= 0xDFFF) {
					emojiCode += cs.substring(i + 1, i + 3);
					startLength += 2;
					i += 2;
				}
			}
			previousGoodIndex = i;
			for (var a = 0; a < 3; a++) {
				if (i + 1 < length) {
					c = cs.charCodeAt(i + 1);
					if (a == 1) {
						if (c == 0x200D && emojiCode.length > 0) {
							emojiCode += cs.charAt(i + 1);
							i++;
							startLength++;
							doneEmoji = false;
						}
					} else {
						if (c >= 0xFE00 && c <= 0xFE0F) {
							i++;
							startLength++;
						}
					}
				}
			}
			if (doneEmoji && i + 2 < length && cs.charCodeAt(i + 1) == 0xD83C) {
				var next = cs.charCodeAt(i + 2);
				if (next >= 0xDFFB && next <= 0xDFFF) {
					emojiCode += cs.substring(i + 1, i + 3);
					startLength += 2;
					i += 2;
				}
			}
			if (doneEmoji) {
				if (emojiOnly != null) {
					emojiOnly[0]++;
				}

				for (var a = 1; a < startLength; a++) {
					s[startIndex+a] = null;
				}
				s[startIndex] = '<span class="emoji-web ' + sizeClassName + makeClassName(emojiCode) + additionalClassName + '"></span>';

				startLength = 0;
				startIndex = -1;
				emojiCode = '';
				doneEmoji = false;
			}
		}
	} catch (e) {
		if (typeof console === 'object') console.log('[emoji-web] Exception', e);
		return cs;
	}
	return s.join('');
}
