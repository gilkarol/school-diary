import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Profile } from './Profile';

export interface SchoolClassDto {
	shortName: string;
	fullName: string;
	tutor?: Profile;
	students?: Profile[];
}
@Entity()
export class SchoolClass {
	@PrimaryColumn()
	shortName?: string;

	@Column()
	fullName?: string;

	@OneToOne(() => Profile, (profile) => profile.classTutor)
	@JoinColumn()
	tutor?: Profile;

	@OneToMany(() => Profile, (profile) => profile.class)
	students?: Profile[];
}
