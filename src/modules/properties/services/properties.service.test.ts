import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { NotFoundError } from '@/core/errors/index.js';
import type { IPropertiesRepository } from '../interfaces/properties.repository.interface.js';
import { PropertiesService } from './properties.service.js';

describe('PropertiesService', () => {
	let service: PropertiesService;
	let mockRepo: {
		findById: Mock;
		findAll: Mock;
		create: Mock;
		update: Mock;
	};

	const mockProperty = {
		id: '123e4567-e89b-12d3-a456-426614174000',
		title: 'Apartamento de Luxo no Jardins',
		description: 'Magnífico apartamento de alto padrão',
		price: '4500000.00',
		condoFee: '3200.00',
		type: 'apartamento',
		purpose: 'venda',
		status: 'active',
		area: 240,
		bedrooms: 4,
		suites: 2,
		bathrooms: 5,
		parkingSpaces: 3,
		isExclusive: true,
		isNew: false,
		addressStreet: 'Rua Oscar Freire',
		neighborhood: 'Jardins',
		city: 'São Paulo',
		state: 'SP',
		imageUrls: ['http://example.com/image.jpg'],
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
		service = new PropertiesService({
			propertiesRepository: mockRepo as unknown as IPropertiesRepository,
		});
	});

	it('should find an item by id', async () => {
		mockRepo.findById.mockResolvedValue(mockProperty);
		await expect(service.getById(mockProperty.id)).resolves.toEqual(
			mockProperty,
		);
	});

	it('should throw NotFoundError if item is not found', async () => {
		mockRepo.findById.mockResolvedValue(null);
		await expect(service.getById('123')).rejects.toThrow(NotFoundError);
	});

	it('should list items', async () => {
		const result = { data: [mockProperty], total: 1 };
		mockRepo.findAll.mockResolvedValue(result);
		await expect(service.list({ page: 1, limit: 10 })).resolves.toEqual({
			data: [mockProperty],
			meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
		});
	});

	it('should create an item', async () => {
		const createData = {
			title: 'Apartamento de Luxo no Jardins',
			price: '4500000.00',
			type: 'apartamento',
			area: 240,
			city: 'São Paulo',
			state: 'SP',
		};
		mockRepo.create.mockResolvedValue(mockProperty);
		await expect(service.create(createData as any)).resolves.toEqual(
			mockProperty,
		);
	});

	it('should update an item', async () => {
		const updateData = { title: 'Updated Title' };
		const updatedProperty = { ...mockProperty, ...updateData };
		mockRepo.update.mockResolvedValue(updatedProperty);
		await expect(service.update(mockProperty.id, updateData)).resolves.toEqual(
			updatedProperty,
		);
	});
});
