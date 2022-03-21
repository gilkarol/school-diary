import { Router } from 'express';
import Container from 'typedi';
import { Joi, celebrate } from 'celebrate';

import { UserAccountService } from '../service/UserAccountService';

const router = Router();

router.post(
	'/signup',
	celebrate({
		body: {
			email: Joi.string().email(),
			password: Joi.string().min(5),
		},
	}),
	async (req, res, next) => {
		const userAccountService = Container.get(UserAccountService);
		try {
			const userAccountData = req.body;
			const userAccount = await userAccountService.create(userAccountData);
			res
				.status(201)
				.json({ message: 'Created user account!', user_account: userAccount });
		} catch (err) {
			return next(err);
		}
	}
);

router.post(
	'/login',
	celebrate({
		body: {
			email: Joi.string().email(),
			password: Joi.string().min(5),
		},
	}),
	async (req, res, next) => {
		const userAccountService = Container.get(UserAccountService);
		try {
			const userAccountData = req.body;
			const userAccount = await userAccountService.login(userAccountData);
			const token = await userAccountService.createToken(userAccount);
			res.status(200).json({
				message: 'User logged in!',
				user_account: userAccount,
				jwt_token: token,
			});
		} catch (err) {
			return next(err);
		}
	}
);

export default router;
