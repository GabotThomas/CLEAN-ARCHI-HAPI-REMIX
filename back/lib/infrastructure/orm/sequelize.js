'use strict';

const { Sequelize } = require('sequelize');
const environment = require('../config/environment');

const sequelize = new Sequelize(environment.database);

module.exports = sequelize;
