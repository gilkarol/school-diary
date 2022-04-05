import { Router } from 'express';
import demeritRoutes from './demerit';

const router = Router();

router.post('/demerit', demeritRoutes);

export default router;
