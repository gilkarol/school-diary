import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn,
} from 'typeorm';

import uuid from '../util/uuid';
import { Demerit } from './Demerit';
import { SchoolClass } from './SchoolClass';
import { UserAccount } from './UserAccount';

export interface StudentProfileDto {
	userAccount: UserAccount;
	email: string;
	firstName: string;
	lastName: string;
	class: SchoolClass;
	profileRole: string;
}

export interface TeacherProfileDto {
	userAccount: UserAccount;
	email: string;
	firstName: string;
	lastName: string;
	profileRole: string;
	classTutor: SchoolClass;
}

@Entity()
export class Profile {
	@PrimaryColumn({ default: uuid })
	id?: string;

	@Column({ unique: true })
	email?: string;

	@OneToOne(() => UserAccount, (userAccount) => userAccount.profile)
	userAccount?: UserAccount;

	@Column()
	profileRole?: string;

	@Column()
	firstName?: string;

	@Column()
	lastName?: string;

	@ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.students, {
		nullable: true,
	})
	class?: SchoolClass;

	@OneToOne(() => SchoolClass, (schoolClass) => schoolClass.tutor)
	classTutor?: SchoolClass;

	@OneToMany(() => Demerit, (demerit) => demerit.profile)
	demerits?: Demerit[];
}
