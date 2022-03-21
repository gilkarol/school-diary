import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentProfile } from './StudentProfile';
import { TeacherProfile } from './TeacherProfile';

@Entity()
export class UserAccount {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	email?: string;

	@Column()
	password?: string;

	@OneToOne(() => StudentProfile, {
		nullable: true,
	})
	studentProfile?: StudentProfile;

	@OneToOne(() => TeacherProfile, {
		nullable: true,
	})
	teacherProfile?: TeacherProfile;
}
