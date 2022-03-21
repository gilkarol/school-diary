import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';

import database from './util/database';
import routes from './route/routes';
import { HttpError } from './util/classes';

dotenv.config();

const app = express();

app.use(bodyparser.json());
app.use(routes);

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
	const message: string = error.message;
	res.status(error.status || 500).json({ message: message });
});

database
	.then((connection) => {
		app.listen(8080);
	})
	.catch((error) => console.log(error));
