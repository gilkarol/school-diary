import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typeorm-typedi-extensions';
import { checkRole } from '../../middleware/checkRole';
import { isAuth } from '../../middleware/isAuth';
import { StudentProfileService } from '../../service/StudentProfileService';
import { sendMailToRegisterUser } from '../../util/mail';

const router = Router();

router.get('/', isAuth, checkRole('admin'), async (req, res, next) => {
	const studentProfileService = Container.get(StudentProfileService);
	try {
		const studentProfiles = await studentProfileService.findAll();
		res.status(200).json({
			message: 'Student profiles found succesfully!',
			student_profiles: studentProfiles,
		});
	} catch (err) {
		return next(err);
	}
});

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
		const studentProfileService = Container.get(StudentProfileService);
		try {
			const { body } = req;
			const studentProfile = await studentProfileService.create(body);
			await sendMailToRegisterUser(studentProfile.email!, studentProfile.id!);
			res.status(200).json({
				message: 'Student profile created successfully!',
				student_profile: studentProfile,
			});
		} catch (err) {
			return next(err);
		}
	}
);

export default router;
