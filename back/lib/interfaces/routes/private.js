'use strict';

module.exports = {
	name: 'private',
	version: '1.0.0',
	register: async server => {
		server.route([
			{
				method: 'GET',
				path: '/private',
				config: {
					auth: 'oauth-jwt',
					handler: request => {
						console.log(request.auth.credentials);
						return { data: 'connecté' };
					},
					description: 'Example of a private resource',
					tags: ['api'],
				},
			},
		]);
	},
};
