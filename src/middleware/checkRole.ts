import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../util/classes';

export const checkRole = (role: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { profileRole } = req.user as { profileRole: string };
		if (role !== profileRole) {
			throw new HttpError(409, `This user is not ${role}`);
		}
		next();
	};
};
