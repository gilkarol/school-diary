import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { SchoolClass } from './SchoolClass';

@Entity()
export class StudentProfile {
	@PrimaryColumn()
	id?: number;

	@Column()
	firstName?: string;

	@Column()
	lastName?: string;

	@ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.students)
	class?: SchoolClass;
}
