import type { CreateLeadBody, LeadDto } from '../schemas/index.js';

export interface ILeadsRepository {
	findAll(
		page: number,
		limit: number,
	): Promise<{ rows: LeadDto[]; total: number }>;
	findById(id: string): Promise<LeadDto | null>;
	create(data: CreateLeadBody): Promise<LeadDto>;
	delete(id: string): Promise<LeadDto | null>;
}
