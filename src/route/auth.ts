import { Router } from 'express';
import Container from 'typedi';
import { Joi, celebrate } from 'celebrate';

import { UserAccountService } from '../service/UserAccountService';
const router = Router();

// CREATE STUDENT USER ACCOUNT
router.post(
	'/signup/student',
	celebrate({
		body: {
			signupToken: Joi.string().uuid().required(),
			password: Joi.string().min(5).required(),
		},
	}),
	async (req, res, next) => {
		const userAccountService = Container.get(UserAccountService);
		try {
			const userAccountData = req.body;
			const userAccount = await userAccountService.createStudentAccount(
				userAccountData
			);
			res
				.status(201)
				.json({
					message: 'Created student user account!',
					user_account: userAccount,
				});
		} catch (err) {
			return next(err);
		}
	}
);

// CREATE TEACHER USER ACCOUNT
router.post(
	'/signup/teacher',
	celebrate({
		body: {
			signupToken: Joi.string().uuid().required(),
			password: Joi.string().min(5).required(),
		},
	}),
	async (req, res, next) => {
		const userAccountService = Container.get(UserAccountService);
		try {
			const userAccountData = req.body;
			const userAccount = await userAccountService.createTeacherAccount(
				userAccountData
			);
			res
				.status(201)
				.json({
					message: 'Created teacher user account!',
					user_account: userAccount,
				});
		} catch (err) {
			return next(err);
		}
	}
);

// LOGIN
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
