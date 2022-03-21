import { createConnection, useContainer } from 'typeorm';
import dotenv from 'dotenv';
import { Container } from 'typeorm-typedi-extensions';
dotenv.config();
useContainer(Container);

export default createConnection({
	type: 'postgres',
	host: process.env.DATABASE_HOST,
	port: +process.env.DATABASE_PORT!,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: 'diary',
	synchronize: true,
	entities: [__dirname + '/../entity/**/*.js'],
});
