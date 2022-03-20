import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SchoolClass } from './SchoolClass';

@Entity()
export class UserAccount {
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

	@ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.students)
	schoolClass?: SchoolClass;
}
