import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserAccount } from './UserAccount';

@Entity()
export class SchoolClass {
	@PrimaryColumn()
	shortName?: string;

	@Column()
	fullName?: string;

	@OneToMany(() => UserAccount, (userAccount) => userAccount.schoolClass)
	students?: UserAccount[]; 
}
