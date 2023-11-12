'use strict';

const { GET } = require('../../infrastructure/config/constants');
const UsersController = require('../controllers/UsersController');

module.exports = {
	name: 'users',
	version: '1.0.0',
	register: async server => {
		server.route([
			{
				method: 'GET',
				path: '/users',
				handler: UsersController.findUsers,
				options: {
					description: 'List all users',
					tags: ['api'],
				},
			},
			{
				method: 'POST',
				path: '/users',
				handler: UsersController.createUser,
				options: {
					description: 'Create a user',
					tags: ['api'],
				},
			},
			{
				method: GET,
				path: '/users/{id}',
				handler: UsersController.getUser,
				config: {
					auth: 'oauth-jwt',
					description: 'Get a user',
					tags: ['api'],
				},
			},
			{
				method: 'DELETE',
				path: '/users/{id}',
				handler: UsersController.deleteUser,
				options: {
					description: 'Delete a user',
					tags: ['api'],
				},
			},
		]);
	},
};
