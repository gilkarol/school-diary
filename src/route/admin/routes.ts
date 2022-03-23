import { Router } from 'express';
import schoolClassRoutes from './schoolClass';
import studentProfileRoutes from './studentProfile';
import teacherProfileRoutes from './teacherProfile';

const router = Router();

router.use('/class', schoolClassRoutes);

router.use('/studentProfile', studentProfileRoutes)

router.use('/teacherProfile', teacherProfileRoutes)

export default router;
