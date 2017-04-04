var fs = require('fs');
var css = require('./js/style-generator.js');

fs.mkdir('css', function() {
	fs.writeFile("./css/emoji-web.css", css);
});
