import { Router } from 'express';
import authRoutes from './auth';
import errorRoutes from './error';
import adminRoutes from './admin/routes';

const router = Router();

router.use('/admin', adminRoutes);

router.use('/auth', authRoutes);

router.use(errorRoutes);

export default router;
