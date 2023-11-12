'use strict';

const sequelize = require('../orm/sequelize');
const User = require('../../domain/User');
const UserSequelize = require('../orm/models/User');
const UserRepository = require('../../domain/UserRepository');

module.exports = class extends UserRepository {
	constructor() {
		super();
		this.db = sequelize;
	}

	async persist(userEntity) {
		const { firstName, lastName, email, password } = userEntity;
		const seqUser = await UserSequelize.create({
			firstName,
			lastName,
			email,
			password,
		});
		await seqUser.save();

		return new User(
			seqUser.id,
			seqUser.firstName,
			seqUser.lastName,
			seqUser.email,
			seqUser.password
		);
	}

	async merge(userEntity) {
		const seqUser = await UserSequelize.findByPk(userEntity.id);

		if (!seqUser) return false;

		const { firstName, lastName, email, password } = userEntity;
		await seqUser.update({ firstName, lastName, email, password });

		return new User(
			seqUser.id,
			seqUser.firstName,
			seqUser.lastName,
			seqUser.email,
			seqUser.password
		);
	}

	async remove(userId) {
		const seqUser = await UserSequelize.findByPk(userId);
		if (seqUser) {
			return seqUser.destroy();
		}
		return false;
	}

	async get(userId) {
		const seqUser = await UserSequelize.findByPk(userId);
		return new User(
			seqUser.id,
			seqUser.firstName,
			seqUser.lastName,
			seqUser.email,
			seqUser.password
		);
	}

	async getByEmail(userEmail) {
		const seqUser = await UserSequelize.findOne({
			where: { email: userEmail },
		});

		const user = new User(
			seqUser.id,
			seqUser.firstName,
			seqUser.lastName,
			seqUser.email,
			seqUser.password
		);

		return user;
	}

	async find() {
		const seqUsers = await UserSequelize.findAll();
		return seqUsers.map(seqUser => {
			return new User(
				seqUser.id,
				seqUser.firstName,
				seqUser.lastName,
				seqUser.email,
				seqUser.password
			);
		});
	}
};
