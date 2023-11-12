'use strict';

const SayHello = require('../../application/use_cases/SayHello');

module.exports = {
	sayHelloWorld() {
		return { data: SayHello() };
	},

	sayHelloPerson(request) {
		return { data: SayHello(request.params.name) };
	},
};
