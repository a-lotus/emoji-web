const data = require('./emoji-data').data;
const makeClassName = require('./emoji').makeClassName;

const emojiFullSize = 64;
const add = 2;
const splitCount = 4;
const cols = [
	[15, 15, 15, 15],
	[ 6,  6,  6,  6],
	[ 8,  8,  8,  8],
	[ 9,  9,  9,  9],
	[10, 10, 10, 10]
];

const commonStyle =
`.emoji-web {
	background-repeat: no-repeat;
	width: 20px;
	height: 20px;
	display: -moz-inline-stack;
	display: inline-block;
	vertical-align: top;
	zoom: 1;
	*display: inline;
}`;

const styleStrings = [commonStyle];

for (let j = 0; j < data.length; j++) {
	const count2 = Math.ceil(data[j].length / splitCount);
	let position;

	for (let i = 0; i < data[j].length; i++) {
		const page = 0 | (i / count2);
		position = i - page * count2;
		const row = position % cols[j][page];
		const col = 0 | (position / cols[j][page]);

		const left = row * emojiFullSize + row * add;
		const top = col * emojiFullSize + col * add;
		// const right = (row + 1) * emojiFullSize + row * add;
		// const bottom = (col + 1) * emojiFullSize + col * add;

		const styleString =
`.${makeClassName(data[j][i])} {
	background: url('../sheets/v11_emoji2.0x_${j}_${page}.png');
	background-position: -${left}px -${top}px;
}`;
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