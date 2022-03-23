import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typeorm-typedi-extensions';
import { SchoolClassService } from '../../service/SchoolClassService';

const router = Router();

router.post(
	'/create',
	celebrate({
		body: {
			shortName: Joi.string().min(2),
			fullName: Joi.string().min(3),
		},
	}),
	async (req, res, next) => {
		const schoolClassService = Container.get(SchoolClassService);
		try {
			const { body } = req;
			const schoolClass = await schoolClassService.create(body);
			res
				.status(200)
				.json({
					message: 'Class created successfully!',
					school_class: schoolClass,
				});
		} catch (err) {
			return next(err);
		}
	}
);

export default router;
