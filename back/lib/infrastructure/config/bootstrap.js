'use strict';

require('dotenv').config();

const sequelize = require('../orm/sequelize');

module.exports = {
	async init() {
		try {
			await sequelize.sync();
			console.log('Connection to DB has been established successfully.');
		} catch (err) {
			console.error('Unable to connect to the database:', err);
		}
	},
};
