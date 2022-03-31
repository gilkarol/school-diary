import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
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

	@ManyToOne(() => Profile, (profile) => profile.demerits)
	profile?: Profile;

	@Column()
	description?: string;
}
