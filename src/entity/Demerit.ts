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
	profile: Profile;
	description: string;
}

@Entity()
export class Demerit {
	@PrimaryColumn({ default: uuid })
	id?: string;

	@Column()
	type?: string;

	@ManyToOne(() => Profile, (profile) => profile.demerits)
	profile?: Profile;

	@Column()
	description?: string;

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
