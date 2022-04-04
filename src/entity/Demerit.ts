import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import uuid from '../util/uuid';
import { Profile } from './Profile';

export interface DemeritDto {
	studentProfile: Profile;
	teacherProfile: Profile,
    type: string;
	description: string;
}

@Entity()
export class Demerit {
	@PrimaryColumn({ default: uuid })
	id?: string;

	@Column()
	type?: string;

	@ManyToOne(() => Profile, (studentProfile) => studentProfile.demerits)
	studentProfile?: Profile;

	@Column()
	description?: string;

	@ManyToOne(() => Profile, (teacherProfile) => teacherProfile.demerits) 
	teacherProfile?: Profile

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	created_at?: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	updated_at?: Date;
}
