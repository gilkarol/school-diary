import { Router, Request, Response, NextFunction } from 'express';
import { HttpError } from '../util/classes';

const router = Router();

router.use(
	(error: HttpError, req: Request, res: Response, next: NextFunction) => {
		const message: string = error.message;
		res.status(error.status ?? 500).json({ message: message });
	}
);

export default router;
