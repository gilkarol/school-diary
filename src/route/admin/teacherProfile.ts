import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typeorm-typedi-extensions';
import { isAuth } from '../../middleware/isAuth';
import { TeacherProfileService } from '../../service/TeacherProfileService';

const router = Router();

router.post(
	'/create',
	isAuth,
	celebrate({
		body: {
			firstName: Joi.string().min(2),
			lastName: Joi.string().min(2),
			email: Joi.string().email(),
		},
	}),
	async (req, res, next) => {
		const teacherProfileService = Container.get(TeacherProfileService);
		try {
			const { body } = req;
			const teacherProfile = await teacherProfileService.create(body);
			res.status(200).json({
				message: 'Student profile created successfully!',
				teacher_profile: teacherProfile,
			});
		} catch (err) {
			return next(err);
		}
	}
);

export default router;
