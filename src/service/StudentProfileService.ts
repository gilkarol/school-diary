import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import {
	Profile,
	StudentProfileDto,
} from '../entity/Profile';
import { HttpError } from '../util/classes';

export class ProfileService {
	constructor(
		@InjectRepository(Profile)
		protected readonly profileRepository: Repository<Profile>
	) {}

	async createStudentProfile(studentProfileDto: StudentProfileDto) {
        const emailAlreadyExists = await this.profileRepository.findOne({
			email: studentProfileDto.email,
		});
		if (emailAlreadyExists) {
			throw new HttpError(409, `Account using email ${studentProfileDto.email} already exists!`);
		}
		const profile = this.profileRepository.create(studentProfileDto);
		return await this.profileRepository.save(profile);
	}
	
}
