import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { Demerit, DemeritDto } from '../entity/Demerit';

@Service()
export class DemeritService {
	constructor(
		@InjectRepository(Demerit)
		protected readonly demeritRepository: Repository<Demerit>
	) {}

	async create(demeritDto: DemeritDto) {
		const demerit = this.demeritRepository.create(demeritDto)
		return await this.demeritRepository.save(demerit)
	}
}
