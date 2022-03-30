import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SchoolClass, SchoolClassDto } from '../entity/SchoolClass';
import { Service } from 'typedi';
import { HttpError } from '../util/classes';
import { Profile } from '../entity/Profile';

@Service()
export class SchoolClassService {
	constructor(
		@InjectRepository(SchoolClass)
		protected readonly schoolClassRepository: Repository<SchoolClass>
	) {}

	async findByShortName(shortName: string): Promise<SchoolClass> {
		const schoolClass = await this.schoolClassRepository.findOne({
			shortName: shortName,
		});
		if (!schoolClass) {
			throw new HttpError(404, `Class ${shortName} does not exist!`);
		}
		return schoolClass;
	}

	async findAll(): Promise<SchoolClass[]> {
		return await this.schoolClassRepository.find();
	}

	async create(schoolClassDto: SchoolClassDto): Promise<SchoolClass> {
		const schoolClass = this.schoolClassRepository.create(schoolClassDto);
		return await this.schoolClassRepository.save(schoolClass);
	}

	async addTutorToClass(
		shortName: string,
		teacherProfile: Profile
	): Promise<SchoolClass> {
		const schoolClass = await this.findByShortName(shortName);
		schoolClass.tutor = teacherProfile;
		return await this.schoolClassRepository.save(schoolClass);
	}

	async removeTutorFromClass(shortName: string): Promise<SchoolClass> {
		const schoolClass = await this.findByShortName(shortName);
		schoolClass.tutor = undefined;
		return await this.schoolClassRepository.save(schoolClass);
	}

	async addStudentToClass(
		shortName: string,
		studentProfile: Profile
	): Promise<SchoolClass> {
		const schoolClass = await this.findByShortName(shortName);
		if (schoolClass.students?.indexOf(studentProfile) != -1) {
			throw new HttpError(409, 'This student is already in a class!');
		}
		schoolClass.students?.push(studentProfile);
		return await this.schoolClassRepository.save(schoolClass);
	}

	async removeStudentFromClass(
		shortName: string,
		studentProfile: Profile
	): Promise<SchoolClass> {
		const schoolClass = await this.findByShortName(shortName);
		schoolClass.students = schoolClass.students?.filter(
			(student) => student !== studentProfile
		);
		return await this.schoolClassRepository.save(schoolClass);
	}
}
