'use strict';

var data = require('./emoji-data').data;
var makeClassName = require('./emoji').makeClassName;

var emojiFullSize = 64;
var add = 2;
var splitCount = 4;
var cols = [[15, 15, 15, 15], [6, 6, 6, 6], [8, 8, 8, 8], [9, 9, 9, 9], [10, 10, 10, 10]];

var commonStyle = '.emoji-web {\n\tbackground-repeat: no-repeat;\n\twidth: 20px;\n\theight: 20px;\n\tdisplay: -moz-inline-stack;\n\tdisplay: inline-block;\n\tvertical-align: top;\n\tzoom: 1;\n\t*display: inline;\n}';

var styleStrings = [commonStyle];

for (var j = 0; j < data.length; j++) {
	var count2 = Math.ceil(data[j].length / splitCount);
	var position = void 0;

	for (var i = 0; i < data[j].length; i++) {
		var page = 0 | i / count2;
		position = i - page * count2;
		var row = position % cols[j][page];
		var col = 0 | position / cols[j][page];

		var left = row * emojiFullSize + row * add;
		var top = col * emojiFullSize + col * add;
		// const right = (row + 1) * emojiFullSize + row * add;
		// const bottom = (col + 1) * emojiFullSize + col * add;

		var styleString = '.' + makeClassName(data[j][i]) + ' {background: url(\'../sheets/v11_emoji2.0x_' + j + '_' + page + '.png\') -' + left + 'px -' + top + 'px;}';
		styleStrings.push(styleString);

		// console.log('--\nleft %d, top %d, right %d, bottom %d', left, top, right, bottom);
		// console.log('page1=%d, page2=%d', j, page);
		// console.log(data[j][i]);
		// console.log('utfNumber=', utfNumber);
		// console.log(styleString);
	}
}

// console.log(styleStrings.join('\n'));

module.exports = styleStrings.join('\n');