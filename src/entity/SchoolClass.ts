import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { StudentProfile } from './StudentProfile';

@Entity()
export class SchoolClass {
	@PrimaryColumn()
	shortName?: string;

	@Column()
	fullName?: string;

	@Column()
	birthdate?: Date;

	@OneToMany(() => StudentProfile, (studentProfile) => studentProfile.class)
	students?: StudentProfile[];
}
