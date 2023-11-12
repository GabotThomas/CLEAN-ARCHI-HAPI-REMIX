const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class UserSequelize extends Model {}

UserSequelize.init(
	{
		firstName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'users',
	}
);

module.exports = UserSequelize;
