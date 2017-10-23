/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Tobias Koppers @sokra
 */

"use strict";

const ConcatSource = require('webpack-sources').ConcatSource;
const getDebugInfo = require('./getDebugInfo');

class DebugPlugin {
	constructor(options) {
		this.options = options || {};
	}

	apply(compiler) {
		const options = this.options;
		const banner = this.banner;

		compiler.plugin("compilation", (compilation) => {
			compilation.plugin("optimize-chunk-assets", (chunks, callback) => {
				chunks.forEach((chunk) => {
					if(!chunk.isInitial()) return;
					chunk.files
						.forEach((file) => {
							let basename;
							let query = "";
							let filename = file;
							const hash = compilation.hash;
							const querySplit = filename.indexOf("?");

							if(querySplit >= 0) {
								query = filename.substr(querySplit);
								filename = filename.substr(0, querySplit);
							}

							if(filename.indexOf("/") < 0) {
								basename = filename;
							} else {
								basename = filename.substr(filename.lastIndexOf("/") + 1);
							}

							const debugInfo = getDebugInfo();

							return compilation.assets[file] = new ConcatSource(debugInfo, "\n", compilation.assets[file]);
						});
				});
				callback();
			});
		});
	}
}

module.exports = DebugPlugin;
