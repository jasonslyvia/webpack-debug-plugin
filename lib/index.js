/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Tobias Koppers @sokra
 */

"use strict";

const ConcatSource = require('webpack-sources').ConcatSource;
const getDebugInfo = require('./getDebugInfo');
const ModuleFilenameHelpers = require('./utils');

class DebugPlugin {
	constructor(options) {
    this.options = options || {};

    if (!options.template || typeof options.template !== 'function') {
      throw new Error('[webpack-debug-plugin] Required option `template` is not provided or is not `function` type');
    }

    this.options = Object.assign({
      multiple: false,
      variableName: 'DEBUG_INFO',
    }, this.options);
	}

	apply(compiler) {
		const options = this.options;

		compiler.plugin("compilation", (compilation) => {
			compilation.plugin("optimize-chunk-assets", (chunks, callback) => {
				chunks.forEach((chunk) => {
					if(!chunk.isInitial()) return;
          chunk.files
						.filter(ModuleFilenameHelpers.matchObject.bind(undefined, options))
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
							const finalStr = options.template(debugInfo, chunk, file);
							const detectGlobal = `const top = typeof global === 'object' ? global : self;`;

              let injectedCode = options.multiple ?
                `${detectGlobal}top.${options.variableName} = top.${options.variableName} || [];
                top.${options.variableName}.push('${finalStr}');` :
                `${detectGlobal}top.${options.variableName} = '${finalStr}';`;

							return compilation.assets[file] = new ConcatSource(injectedCode, "\n", compilation.assets[file]);
						});
				});
				callback();
			});
		});
	}
}

module.exports = DebugPlugin;
