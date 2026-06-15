import type { Property } from '@/infra/db/schema/properties.js';
import type {
	AdminPropertySummary,
	CreatePropertyBody,
	ListPropertiesQuery,
	UpdatePropertyBody,
} from '../schemas/index.js';

export interface IPropertiesRepository {
	findById(id: string): Promise<Property | null>;
	findAll(
		query: ListPropertiesQuery,
	): Promise<{ data: Property[]; total: number }>;
	findAllSummary(
		query: ListPropertiesQuery,
	): Promise<{ data: AdminPropertySummary[]; total: number }>;
	create(data: CreatePropertyBody): Promise<Property>;
	update(id: string, data: UpdatePropertyBody): Promise<Property | null>;
	delete(id: string): Promise<boolean>;
}
