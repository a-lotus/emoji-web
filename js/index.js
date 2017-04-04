'use strict';

// import { emojiSecret, emojiColored, dataColored, data, emojiToFE0FMap, dataCharsMap, emojiColoredMap } from './emoji-data'
var EmojiData = require('./emoji-data');
var emoji = require('./emoji');

console.log('fixEmoji(🏠🏫🏢🏣🏥🏦🏪🏩🏨💒⛪🏬🌇)\n', emoji.fixEmoji('🏠🏫🏢🏣🏥🏦🏪🏩🏨💒⛪🏬🌇'));
console.log('fixEmoji(# 0 1 2 3 4 5 6 7 8 9 ⃣   🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿  #⃣0⃣1⃣2⃣3⃣4⃣5⃣6⃣7⃣8⃣9⃣©®  ‼⁉)\n', emoji.fixEmoji('# 0 1 2 3 4 5 6 7 8 9 ⃣   🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿  #⃣0⃣1⃣2⃣3⃣4⃣5⃣6⃣7⃣8⃣9⃣©®  ‼⁉'));

console.log('replaceEmoji("Какой-то нормальный текст... 🏠🏫🏢🏣🏥🏦🏪🏩🏨💒⛪🏬🌇")\n', emoji.replaceEmoji("Какой-то нормальный текст... 🏠🏫🏢🏣🏥🏦🏪🏩🏨💒⛪🏬🌇"));
console.log('replaceEmoji("Какой-то нормальный текст, # 0 1 2 3 4 5 6 7 8 9, потом всякие символы... ⃣   🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿  #⃣0⃣1⃣2⃣3⃣4⃣5⃣6⃣7⃣8⃣9⃣©®  ‼⁉")\n', emoji.replaceEmoji("Какой-то нормальный текст, # 0 1 2 3 4 5 6 7 8 9, потом всякие символы... ⃣   🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿  #⃣0⃣1⃣2⃣3⃣4⃣5⃣6⃣7⃣8⃣9⃣©®  ‼⁉"));


var str = emoji.replaceEmoji("Какой-то нормальный текст... 🏠🏫🏢🏣🏥 bovo 🙅👎 !!! 🏩🏨💒⛪🏬🌇");
console.dir(EmojiData);
console.log('window.ed now contains EmojiData object');
window.ed = EmojiData;

document.addEventListener("DOMContentLoaded", function() {
	var newBlock = document.createElement('div');
	newBlock.innerHTML = str;
	document.body.appendChild(newBlock);
});