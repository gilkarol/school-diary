import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Profile, TeacherProfileDto } from '../entity/Profile';
import { HttpError } from '../util/classes';

@Service()
export class TeacherProfileService {
	constructor(
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>
	) {}

	async create(teacherProfileDto: TeacherProfileDto) {
		const emailAlreadyExists = await this.profileRepository.findOne({
			email: teacherProfileDto.email,
		});
		if (emailAlreadyExists) {
			throw new HttpError(
				409,
				`Account using email ${teacherProfileDto.email} already exists!`
			);
		}
		teacherProfileDto.profileRole = 'teacher';
		const profile = this.profileRepository.create(teacherProfileDto);
		return await this.profileRepository.save(profile);
	}

	async findAll(): Promise<Profile[]> {
		return await this.profileRepository.find({ profileRole: 'teacher' });
	}

	async update(teacherProfile: Profile) {
		return await this.profileRepository.save(teacherProfile);
	}

	async findById(id: string): Promise<Profile> {
		const profile = await this.profileRepository.findOne({
			id: id,
			profileRole: 'teacher',
		});
		if (!profile) {
			throw new HttpError(404, 'This profile does not exist!');
		}
		return profile;
	}
}
