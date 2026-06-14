import type {
	CreateGallerySaleBody,
	GallerySaleDto,
	ListGallerySalesQuery,
	UpdateGallerySaleBody,
} from '../schemas/gallery-sales.js';

export interface IGallerySalesRepository {
	findById(id: string): Promise<GallerySaleDto | null>;
	findAll(query: ListGallerySalesQuery): Promise<{ data: GallerySaleDto[]; total: number }>;
	create(data: CreateGallerySaleBody): Promise<GallerySaleDto>;
	update(id: string, data: UpdateGallerySaleBody): Promise<GallerySaleDto | null>;
	delete(id: string): Promise<boolean>;
}
