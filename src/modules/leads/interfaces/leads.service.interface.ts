import type { CreateLeadBody, LeadDto } from '../schemas/index.js';

export interface ILeadsService {
	list(
		page: number,
		limit: number,
	): Promise<{ rows: LeadDto[]; total: number }>;
	getById(id: string): Promise<LeadDto>;
	create(data: CreateLeadBody): Promise<LeadDto>;
	delete(id: string): Promise<void>;
}
