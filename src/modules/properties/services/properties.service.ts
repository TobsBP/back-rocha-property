import { NotFoundError } from '@/core/errors/index.js';
import type { Property } from '@/infra/db/schema/properties.js';
import type { IPropertiesRepository } from '../interfaces/properties.repository.interface.js';
import type { IPropertiesService } from '../interfaces/properties.service.interface.js';
import type {
	CreatePropertyBody,
	ListPropertiesQuery,
	UpdatePropertyBody,
} from '../schemas/index.js';

export class PropertiesService implements IPropertiesService {
	private repo: IPropertiesRepository;
	constructor({
		propertiesRepository,
	}: { propertiesRepository: IPropertiesRepository }) {
		this.repo = propertiesRepository;
	}

	async getById(id: string): Promise<Property> {
		const item = await this.repo.findById(id);
		if (!item) throw new NotFoundError('Property', id);
		return item;
	}

	async list(query: ListPropertiesQuery) {
		const page = query.page ?? 1;
		const limit = query.limit ?? 20;
		const { data, total } = await this.repo.findAll(query);

		return {
			data,
			meta: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	async listAdminSummary(query: ListPropertiesQuery) {
		const page = query.page ?? 1;
		const limit = query.limit ?? 20;
		const { data, total } = await this.repo.findAllSummary(query);

		return {
			data,
			meta: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	async create(data: CreatePropertyBody): Promise<Property> {
		return this.repo.create(data);
	}

	async update(id: string, data: UpdatePropertyBody): Promise<Property> {
		const item = await this.repo.update(id, data);
		if (!item) throw new NotFoundError('Property', id);
		return item;
	}

	async delete(id: string): Promise<void> {
		const deleted = await this.repo.delete(id);
		if (!deleted) throw new NotFoundError('Property', id);
	}
}
