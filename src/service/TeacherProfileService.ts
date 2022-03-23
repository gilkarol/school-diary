import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import {
	Profile,
	TeacherProfileDto,
} from '../entity/Profile';
import { HttpError } from '../util/classes';

@Service()
export class TeacherProfileService {
	constructor(
		@InjectRepository(Profile)
		private profileRepository: Repository<Profile>
	) {}

	async createTeacherProfile(teacherProfileDto: TeacherProfileDto) {
        const emailAlreadyExists = await this.profileRepository.findOne({
			email: teacherProfileDto.email,
		});
		if (emailAlreadyExists) {
			throw new HttpError(409, `Account using email ${teacherProfileDto.email} already exists!`);
		}
		const profile = this.profileRepository.create(teacherProfileDto);
		return await this.profileRepository.save(profile);
	}

}
