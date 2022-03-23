import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typeorm-typedi-extensions';
import { checkRole } from '../../middleware/checkRole';
import { isAuth } from '../../middleware/isAuth';
import { TeacherProfileService } from '../../service/TeacherProfileService';
import { sendMailToRegisterUser } from '../../util/mail';

const router = Router();

router.get('/', isAuth, checkRole('admin'), async (req, res, next) => {
	const teacherProfileService = Container.get(TeacherProfileService);
	try {
		const teacherProfiles = await teacherProfileService.findAll();
		res.status(200).json({
			message: 'Teacher profiles found succesfully!',
			teacher_profiles: teacherProfiles,
		});
	} catch (err) {
		return next(err);
	}
});

router.get(
	'/:teacherProfileId',
	isAuth,
	checkRole('admin'),
	async (req, res, next) => {
		const teacherProfileService = Container.get(TeacherProfileService);
		try {
			const { teacherProfileId } = req.params;
			const teacherProfile = await teacherProfileService.findById(
				teacherProfileId
			);
			res.status(200).json({
				message: 'Teacher profile found successfully!',
				teacher_profile: teacherProfile,
			});
		} catch (err) {
			return next(err);
		}
	}
);

router.post(
	'/create',
	isAuth,
	checkRole('admin'),
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
			await sendMailToRegisterUser(teacherProfile.email!, teacherProfile.id!);
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
