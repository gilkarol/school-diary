import { Service } from 'typedi';
import { Repository } from 'typeorm';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { UserAccount } from '../entity/UserAccount';
import { HttpError } from '../util/classes';

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

	async create(userAccountData: UserAccount): Promise<UserAccount> {
		const emailAlreadyExists = await this.userAccountRepository.findOne({
			email: userAccountData.email,
		});
		if (emailAlreadyExists) {
			throw new HttpError(409, 'Account using this email already exists!');
		}
		userAccountData.password = await bcryptjs.hash(
			userAccountData.password!,
			10
		);
		const userAccount = this.userAccountRepository.create(userAccountData);
		return await this.userAccountRepository.save(userAccount);
	}

	async login(userAccountData: UserAccount): Promise<UserAccount> {
		const userAccount = await this.findByEmail(userAccountData.email!);
		const isPasswordEqual = bcryptjs.compare(
			userAccountData.password!,
			userAccount!.password!
		);
		if (!isPasswordEqual) {
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
