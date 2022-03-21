import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';

import database from './util/database';
import routes from './route/routes';

dotenv.config();

const app = express();

app.use(bodyparser.json());
app.use(routes);

database
	.then((connection) => {
		app.listen(8080);
	})
	.catch((error) => console.log(error));
