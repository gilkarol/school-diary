import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typeorm-typedi-extensions';
import { StudentProfileService } from '../../service/StudentProfileService';

const router = Router();

router.post(
	'/create',
	celebrate({
		body: {
			firstName: Joi.string().min(2),
			lastName: Joi.string().min(2),
			email: Joi.string().email(),
		},
	}),
	async (req, res, next) => {
		const studentProfileService = Container.get(StudentProfileService);
		try {
			const { body } = req;
			const studentProfile = await studentProfileService.create(body);
			res
				.status(200)
				.json({
					message: 'Student profile created successfully!',
					student_profile: studentProfile,
				});
		} catch (err) {
			return next(err);
		}
	}
);

export default router;
