import { Router } from 'express';
import { Container } from 'typeorm-typedi-extensions';
import { UserAccount } from '../../entity/UserAccount';
import { checkRole } from '../../middleware/checkRole';
import { isAuth } from '../../middleware/isAuth';
import { DemeritService } from '../../service/DemeritService';
import { StudentProfileService } from '../../service/StudentProfileService';

const router = Router();

router.post(
	'/demerit/create',
	isAuth,
	checkRole('teacher'),
	async (req, res, next) => {
		const { studentId, description, type } = req.body;
		const user: UserAccount = req.user!;
		const studentProfileService = Container.get(StudentProfileService);
		const demeritService = Container.get(DemeritService);
		try {
			const studentProfile = await studentProfileService.findById(studentId);
			const demerit = await demeritService.create({
				teacherProfile: user.profile!,
				studentProfile,
				description,
				type,
			});
			res
				.status(201)
				.json({ message: 'Demerit created successfully!', demerit: demerit });
		} catch (err) {
			return next(err);
		}
	}
);

export default router;
