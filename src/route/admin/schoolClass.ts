import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typeorm-typedi-extensions';
import { checkRole } from '../../middleware/checkRole';
import { isAuth } from '../../middleware/isAuth';
import { SchoolClassService } from '../../service/SchoolClassService';
import { StudentProfileService } from '../../service/StudentProfileService';

const router = Router();

// CREATE NEW SCHOOL CLASS
router.post(
	'/create',
	isAuth,
	checkRole('admin'),
	celebrate({
		body: {
			shortName: Joi.string().min(2).required(),
			fullName: Joi.string().min(3).required(),
		},
	}),
	async (req, res, next) => {
		const schoolClassService = Container.get(SchoolClassService);
		try {
			const { body } = req;
			const schoolClass = await schoolClassService.create(body);
			res.status(200).json({
				message: 'Class created successfully!',
				school_class: schoolClass,
			});
		} catch (err) {
			return next(err);
		}
	}
);

// ADD STUDENT DO CLASS
router.post(
	'/:classShortName/addStudent/:studentId',
	isAuth,
	checkRole('admin'),
	async (req, res, next) => {
		const schoolClassService = Container.get(SchoolClassService);
		const studentProfileService = Container.get(StudentProfileService);
		const { classShortName, studentId } = req.params;
		try {
			const studentProfile = await studentProfileService.findById(studentId);
			const schoolClass = await schoolClassService.addStudentToClass(
				classShortName,
				studentProfile
			);
			res
				.status(200)
				.json({
					message: 'Student has been successfully added to the class!',
					school_class: schoolClass,
				});
		} catch (err) {
			return next(err);
		}
	}
);

export default router;
