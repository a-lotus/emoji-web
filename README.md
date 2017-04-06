# emoji-web

Library to replace unicode emoji by pictures. Plus, the library contains images of emoji.

Designed for use [Webpack](https://webpack.js.org/).

Sprites and some code taken from the [Telegram for Android](https://github.com/DrKLO/Telegram).

## Install

```sh
yarn add emoji-web
# or
npm install --save emoji-web
```

## Usage

```javascript
import emojiWeb from 'emoji-web';

const html = emojiWeb.replaceEmoji("Some ascii text... 🏠 😉 and unicode 😍 any symbols 💂", 32, 'some-custom-class');

/* returns:
	Some ascii text... <img src="/dist/img/0d23d0.gif" class="emoji-web some-custom-class" alt="🏠" style="height: 32px; width: 32px; background: url(/dist/img/a65648.png) -66px -297px / 297px;" draggable="false"/> ...and so on
*/

document.addEventListener("DOMContentLoaded", function() {
	var newBlock = document.createElement('div');
	newBlock.innerHTML = html;
	document.body.appendChild(newBlock);
});

```

## Build

The build configuration should include the loader files and styles.
Assume that build files should be in "dist" folder, then the minimum required configuration will look as shown below (webpack.config.js):

```javascript
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	entry: './index.js',
	output: {
		filename: './dist/index.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.(png|gif)$/,
				loader: 'file-loader',
				options: {
					publicPath: '/',
					outputPath: 'dist/img/',
					name: '[hash:6].[ext]'
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'dist/index.css',
			disable: false,
			allChunks: true,
			ignoreOrder: true
		})
	],

};
```

## Demo

You can run the demo. To do this, simply run the commands:

```sh
cd emoji-web/demo
yarn
yarn start
```