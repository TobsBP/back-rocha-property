import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { NotFoundError } from '@/core/errors/index.js';
import type { IProductsRepository } from '../interfaces/products.repository.interface.js';
import { ProductsService } from './products.service.js';

describe('ProductsService', () => {
	let service: ProductsService;
	let mockRepo: {
		findById: Mock;
		findAll: Mock;
		create: Mock;
		update: Mock;
	};

	const mockProduct = {
		id: '123e4567-e89b-12d3-a456-426614174000',
		name: 'Concrete Vase',
		description: 'Minimalist vase',
		basePrice: '45.00',
		imageUrl: 'http://example.com/image.jpg',
		active: 1,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	beforeEach(() => {
		mockRepo = {
			findById: vi.fn(),
			findAll: vi.fn(),
			create: vi.fn(),
			update: vi.fn(),
		};
		service = new ProductsService({
			productsRepository: mockRepo as unknown as IProductsRepository,
		});
	});

	it('should find an item by id', async () => {
		mockRepo.findById.mockResolvedValue(mockProduct);
		await expect(service.getById(mockProduct.id)).resolves.toEqual(mockProduct);
	});

	it('should throw NotFoundError if item is not found', async () => {
		mockRepo.findById.mockResolvedValue(null);
		await expect(service.getById('123')).rejects.toThrow(NotFoundError);
	});

	it('should list items', async () => {
		const result = { data: [mockProduct], total: 1 };
		mockRepo.findAll.mockResolvedValue(result);
		await expect(service.list({ page: 1, limit: 10 })).resolves.toEqual(result);
	});

	it('should create an item', async () => {
		const createData = {
			name: 'Concrete Vase',
			basePrice: '45.00',
		};
		mockRepo.create.mockResolvedValue(mockProduct);
		await expect(service.create(createData as any)).resolves.toEqual(
			mockProduct,
		);
	});

	it('should update an item', async () => {
		const updateData = { name: 'Updated Name' };
		const updatedProduct = { ...mockProduct, ...updateData };
		mockRepo.update.mockResolvedValue(updatedProduct);
		await expect(service.update(mockProduct.id, updateData)).resolves.toEqual(
			updatedProduct,
		);
	});
});
