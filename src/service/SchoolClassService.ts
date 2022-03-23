import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SchoolClass, SchoolClassDto } from '../entity/SchoolClass';
import { Service } from 'typedi';

@Service()
export class SchoolClassService {
	constructor(
		@InjectRepository(SchoolClass)
		protected readonly schoolClassRepository: Repository<SchoolClass>
	) {}

	async create(schoolClassDto: SchoolClassDto): Promise<SchoolClass> {
		const schoolClass = this.schoolClassRepository.create(schoolClassDto);
		return await this.schoolClassRepository.save(schoolClass);
	}
}
