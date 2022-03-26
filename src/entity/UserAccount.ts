import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import uuid from '../util/uuid';
import { Profile } from './Profile';

export interface UserAccountDto {
	email: string;
	password: string;
	profileRole: string;
	signupToken?: string;
}
@Entity()
export class UserAccount {
	@PrimaryColumn({ default: uuid })
	id?: string;

	@Column({ unique: true })
	email?: string;

	@Column({})
	password?: string;

	@OneToOne(() => Profile, {
		nullable: true,
	})
	@JoinColumn()
	profile?: Profile;

	@Column({ default: null })
	profileRole?: string;
}
