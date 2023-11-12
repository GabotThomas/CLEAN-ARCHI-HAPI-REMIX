'use strict';
const development = require('./config');
/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
module.exports = (() => {
	const environment = {
		database: {
			...development,
			logging: false,
		},
	};

	return environment;
})();
