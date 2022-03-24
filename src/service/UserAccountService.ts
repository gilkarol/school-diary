import { Service } from 'typedi';
import { Repository } from 'typeorm';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Container, InjectRepository } from 'typeorm-typedi-extensions';

import { UserAccount, UserAccountDto } from '../entity/UserAccount';
import { HttpError } from '../util/classes';
import { comparePassword, hashPassword } from '../util/hash';
import { Profile } from '../entity/Profile';
import { StudentProfileService } from './StudentProfileService';
import { TeacherProfileService } from './TeacherProfileService';

@Service()
export class UserAccountService {
	constructor(
		@InjectRepository(UserAccount)
		protected readonly userAccountRepository: Repository<UserAccount>
	) {}

	async findByEmail(email: string) {
		const userAccount = await this.userAccountRepository.findOne({
			email: email,
		});
		if (!userAccount) {
			throw new HttpError(404, 'User account not found!');
		}
		return userAccount;
	}

	async createStudentAccount(userAccountDto: UserAccountDto): Promise<UserAccount> {
		const studentProfileService = Container.get(StudentProfileService)
		const studentProfile = await studentProfileService.findById(userAccountDto.signupToken!)
		userAccountDto.profileRole = 'student'
		userAccountDto.email = studentProfile.email!
		const userAccount = this.userAccountRepository.create(userAccountDto)
		studentProfile.userAccount = userAccount
		await studentProfileService.update(studentProfile)
		return await this.userAccountRepository.save(userAccount)
	}

	async createTeacherAccount(userAccountDto: UserAccountDto): Promise<UserAccount> {
		const teacherProfileService = Container.get(TeacherProfileService)
		const teacherProfile = await teacherProfileService.findById(userAccountDto.signupToken!)
		userAccountDto.profileRole = 'teacher'
		userAccountDto.email = teacherProfile.email!
		const userAccount = this.userAccountRepository.create(userAccountDto)
		teacherProfile.userAccount = userAccount
		await teacherProfileService.update(teacherProfile)
		return await this.userAccountRepository.save(userAccount)
	}

	async login(userAccountDto: UserAccountDto): Promise<UserAccount> {
		const userAccount = await this.findByEmail(userAccountDto.email!);
		if (
			!await comparePassword(userAccountDto.password!, userAccount.password!)
		) {
			throw new HttpError(409, 'Passwords does not match!');
		}
		return userAccount!;
	}

	async createToken(userAccountData: UserAccount): Promise<string> {
		return jwt.sign(
			{ userId: userAccountData.id! },
			process.env.JWT_SECRET_TOKEN!
		);
	}
}
