import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Profile, StudentProfileDto } from '../entity/Profile';
import { HttpError } from '../util/classes';

@Service()
export class StudentProfileService {
	constructor(
		@InjectRepository(Profile)
		protected readonly profileRepository: Repository<Profile>
	) {}

	async create(studentProfileDto: StudentProfileDto): Promise<Profile> {
		const emailAlreadyExists = await this.profileRepository.findOne({
			email: studentProfileDto.email,
		});
		if (emailAlreadyExists) {
			throw new HttpError(
				409,
				`Account using email ${studentProfileDto.email} already exists!`
			);
		}
		studentProfileDto.profileRole = 'student';
		const profile = this.profileRepository.create(studentProfileDto);
		return await this.profileRepository.save(profile);
	}

	async findAll(): Promise<Profile[]> {
		return await this.profileRepository.find({ profileRole: 'student' });
	}

	async findById(id: string): Promise<Profile> {
		const profile = await this.profileRepository.findOne({
			id: id,
			profileRole: 'student',
		});
		if (!profile) {
			throw new HttpError(404, 'This profile does not exist!');
		}
		return profile;
	}

	async update(studentProfile: Profile) {
		return await this.profileRepository.save(studentProfile);
	}
}
