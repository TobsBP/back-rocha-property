import type { Property } from '@/infra/db/schema/properties.js';
import type {
	AdminPropertySummary,
	CreatePropertyBody,
	ListPropertiesQuery,
	UpdatePropertyBody,
} from '../schemas/index.js';

export interface IPropertiesService {
	getById(id: string): Promise<Property>;
	list(query: ListPropertiesQuery): Promise<{
		data: Property[];
		meta: { total: number; page: number; limit: number; totalPages: number };
	}>;
	listAdminSummary(query: ListPropertiesQuery): Promise<{
		data: AdminPropertySummary[];
		meta: { total: number; page: number; limit: number; totalPages: number };
	}>;
	create(data: CreatePropertyBody): Promise<Property>;
	update(id: string, data: UpdatePropertyBody): Promise<Property>;
}
