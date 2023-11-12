'use strict';

const constants = require('./constants');
const environment = require('./environment');
const JwtAccessTokenManager = require('../security/JwtAccessTokenManager');
const UserSerializer = require('../../interfaces/serializers/UserSerializer');

function buildBeans() {
	const beans = {
		accessTokenManager: new JwtAccessTokenManager(),
		userSerializer: new UserSerializer(),
	};

	const UserRepository = require('../repositories/UserRepository');
	beans.userRepository = new UserRepository();

	return beans;
}

module.exports = buildBeans();
