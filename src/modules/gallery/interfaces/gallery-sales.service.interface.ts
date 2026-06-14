import type {
	CreateGallerySaleBody,
	GallerySaleDto,
	ListGallerySalesQuery,
	UpdateGallerySaleBody,
} from '../schemas/gallery-sales.js';

export interface IGallerySalesService {
	getById(id: string): Promise<GallerySaleDto>;
	list(query: ListGallerySalesQuery): Promise<{ data: GallerySaleDto[]; total: number; page: number; limit: number; totalPages: number }>;
	create(data: CreateGallerySaleBody): Promise<GallerySaleDto>;
	update(id: string, data: UpdateGallerySaleBody): Promise<GallerySaleDto>;
	delete(id: string): Promise<void>;
}
