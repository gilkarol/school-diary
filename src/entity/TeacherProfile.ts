import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TeacherProfile {
	@PrimaryColumn()
	id?: number;

	@Column()
	firstName?: string;

	@Column()
	lastName?: string;
}
