"use strict";

var data = require('./emoji-data').data;
var settings = require('./sheets-settings.js');

function generate() {
	var imagePositions = Object.create(null);
	for (var j = 0; j < data.length; j++) {
		var count2 = Math.ceil(data[j].length / settings.splitCount);
		var position = 0;

		for (var i = 0; i < data[j].length; i++) {
			var page = 0 | i / count2;
			position = i - page * count2;
			var row = position % settings.cols[j][page];
			var col = 0 | position / settings.cols[j][page];

			var left = row * settings.emojiFullSize + row * settings.add;
			var top = col * settings.emojiFullSize + col * settings.add;
			imagePositions[data[j][i]] = [ j, page, left, top ];
		}
	}
	return imagePositions;
}

module.exports = generate;
