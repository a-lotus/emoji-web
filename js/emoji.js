export function utfMark(char) {
	const utfNumber = char.charCodeAt(0).toString(16);
	if (char.length == 2) {
		return utfNumber + '-' + char.charCodeAt(1).toString(16);
	}
	return utfNumber;
}

export function makeClassName(char) {
	return 'ew' + utfMark(char);
}