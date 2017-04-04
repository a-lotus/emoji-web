'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.utfMark = utfMark;
exports.makeClassName = makeClassName;
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