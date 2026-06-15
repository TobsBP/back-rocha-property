import { NotFoundError } from '../../../core/errors/index.js';
import type { ILeadsRepository } from '../interfaces/leads.repository.interface.js';
import type { ILeadsService } from '../interfaces/leads.service.interface.js';
import type { CreateLeadBody, LeadDto } from '../schemas/index.js';

export class LeadsService implements ILeadsService {
	private repo: ILeadsRepository;
	constructor({ leadsRepository }: { leadsRepository: ILeadsRepository }) {
		this.repo = leadsRepository;
	}

	async list(page: number, limit: number) {
		return this.repo.findAll(page, limit);
	}

	async getById(id: string): Promise<LeadDto> {
		const item = await this.repo.findById(id);
		if (!item) throw new NotFoundError('Lead', id);
		return item;
	}

	async create(data: CreateLeadBody): Promise<LeadDto> {
		return this.repo.create(data);
	}

	async delete(id: string): Promise<void> {
		const deleted = await this.repo.delete(id);
		if (!deleted) throw new NotFoundError('Lead', id);
	}
}
