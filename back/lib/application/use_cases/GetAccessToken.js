'use strict';

module.exports = async (
	email,
	password,
	{ userRepository, accessTokenManager }
) => {
	const user = await userRepository.getByEmail(email);

	if (!user || user.password !== password) {
		throw new Error('Bad credentials');
	}

	const token = accessTokenManager.generate({ uid: user.id });

	return { token, user: { id: user.id, email: user.email } };
};
