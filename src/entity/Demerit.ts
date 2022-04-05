import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import uuid from '../util/uuid';
import { Profile } from './Profile';

export interface DemeritDto {
	studentProfile: Profile;
	teacherProfile: Profile;
	type: string;
	description: string;
}

@Entity()
export class Demerit {
	@PrimaryColumn({ default: uuid })
	id?: string;

	@Column()
	type?: string;

	@ManyToOne(() => Profile, (studentProfile) => studentProfile.studentDemerits)
	studentProfile?: Profile;

	@Column()
	description?: string;
}
