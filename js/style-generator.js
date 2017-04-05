'use strict';

var data = require('./emoji-data').data;
var makeClassName = require('./emoji').makeClassName;

var emojiFullSize = 64;
var add = 2;
var splitCount = 4;
var cols = [[15, 15, 15, 15], [6, 6, 6, 6], [8, 8, 8, 8], [9, 9, 9, 9], [10, 10, 10, 10]];

var styleStrings = [
	'.emoji-web {\n\tbackground-repeat: no-repeat;\n\twidth: 64px;\n\theight: 64px;\n\tdisplay: -moz-inline-stack;\n\tdisplay: inline-block;\n\tvertical-align: top;\n\t*display: inline;\n}',
	'.ew32 {zoom: 0.5}',
	'.ew24 {zoom: 0.375}',
	'.ew16 {zoom: 0.25}'
];

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
	}
}

module.exports = styleStrings.join('\n');