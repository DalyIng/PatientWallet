module.exports = {
	webpack: config => {
		config.devtool = false;
		// Fixes npm packages that depend on `fs` module
		config.node = {
			fs: "empty"
		};
		config.plugins = config.plugins.filter(plugin => {
			if (plugin.constructor.name === "UglifyJsPlugin") {
				return false;
			} else {
				return true;
			}
		});

		for (const r of config.module.rules) {
			if (r.loader === "babel-loader") {
				r.options.sourceMaps = false;
			}
		}

		return config;
	}
};
