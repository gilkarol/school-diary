import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	email?: string;

	@Column()
	password?: string;

	@Column()
	firstName?: string;

	@Column()
	lastName?: string;

	@Column()
	birthdate?: Date;
}
