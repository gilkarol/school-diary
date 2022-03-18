import { createConnection } from 'typeorm';
import dotenv from 'dotenv'
dotenv.config()

export default createConnection({
	type: 'postgres',
	host: process.env.DATABASE_HOST,
	port: +process.env.DATABASE_PORT!,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: 'diary',
	synchronize: true,
	entities: [__dirname  + '/../entity/**/*.js'],
});
