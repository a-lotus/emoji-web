'use strict';

var emojiWeb = require('../js/index');

// var strs = [
// 	emojiWeb.replaceEmoji("Какой-то нормальный текст... 🏠🏫🏢 😉 😍 😛 😭 😴 😵 😬 😇 😏 👮 👷 💂 bovo 🙅👎 !!! 🏩🏨💒⛪🏬🌇", 32, 'bobo'),
// 	emojiWeb.replaceEmoji(emojiWeb.dataColored[0].join(' '), 16, 'some-custom-class'),
// 	emojiWeb.replaceEmoji(emojiWeb.dataColored[1].join(' '), 32),
// 	emojiWeb.replaceEmoji(emojiWeb.dataColored[2].join(' '), 32),
// 	emojiWeb.replaceEmoji(emojiWeb.dataColored[3].slice(0, 124).join(' '), 32),
// 	emojiWeb.replaceEmoji(emojiWeb.dataColored[4].join(' '), 16),
// ];

var categories = [
	'<h2>People</h2>',
	emojiWeb.replaceEmoji(emojiWeb.dataColored[0].slice(0, 291).join(''), 32, 'picker-item'),
	'<h2>Nature</h2>',
	emojiWeb.replaceEmoji(emojiWeb.dataColored[1].join(''), 32, 'picker-item'),
	'<h2>Food & Drink</h2>',
	emojiWeb.replaceEmoji(emojiWeb.dataColored[2].slice(0, 86).join(''), 32, 'picker-item'),
	'<h2>Activity</h2>',
	emojiWeb.replaceEmoji(emojiWeb.dataColored[2].slice(86).join(''), 32, 'picker-item'),
	'<h2>Travel & Places</h2>',
	emojiWeb.replaceEmoji(emojiWeb.dataColored[3].slice(0, 119).join(''), 32, 'picker-item'),
	'<h2>Objects</h2>',
	emojiWeb.replaceEmoji(emojiWeb.dataColored[4].slice(256).join(''), 32, 'picker-item'),
	'<h2>Symbols & Flags</h2>',
	emojiWeb.replaceEmoji(emojiWeb.dataColored[0].slice(291).concat(emojiWeb.dataColored[4].slice(0, 256).concat(emojiWeb.dataColored[3].slice(119, 124))).join(''), 32, 'picker-item'),
];

document.addEventListener("DOMContentLoaded", function() {
	var newBlock = document.createElement('div');
	// newBlock.innerHTML = strs.join('<hr>');
	newBlock.innerHTML = categories.join('');
	document.body.appendChild(newBlock);
});
