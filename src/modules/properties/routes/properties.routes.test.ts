import Fastify, { type FastifyInstance } from 'fastify';
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	type Mock,
	vi,
} from 'vitest';
import { PropertiesController } from '../controllers/properties.controller.js';
import type { IPropertiesService } from '../interfaces/properties.service.interface.js';

describe('Properties Routes', () => {
	let fastify: FastifyInstance;
	let mockService: {
		getById: Mock;
		list: Mock;
		create: Mock;
		update: Mock;
	};

	const mockProperty = {
		id: '123e4567-e89b-12d3-a456-426614174000',
		title: 'Apartamento de Luxo no Jardins',
		description: 'Magnífico apartamento de alto padrão',
		price: '4500000.00',
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
		city: 'São Paulo',
		state: 'SP',
		imageUrl: 'http://example.com/image.jpg',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	beforeEach(async () => {
		fastify = Fastify();
		mockService = {
			getById: vi.fn(),
			list: vi.fn(),
			create: vi.fn(),
			update: vi.fn(),
		};

		const controller = new PropertiesController({
			propertiesService: mockService as unknown as IPropertiesService,
		});

		fastify.get('/properties', controller.list);
		fastify.get('/properties/:id', controller.getById);
		fastify.post('/properties', controller.create);
		fastify.patch('/properties/:id', controller.update);

		await fastify.ready();
	});

	afterEach(async () => {
		await fastify.close();
	});

	it('GET /properties/:id should return item', async () => {
		mockService.getById.mockResolvedValue(mockProperty);

		const response = await fastify.inject({
			method: 'GET',
			url: `/properties/${mockProperty.id}`,
		});

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual(mockProperty);
	});

	it('GET /properties should return paginated items', async () => {
		const result = { data: [mockProperty], total: 1 };
		mockService.list.mockResolvedValue(result);

		const response = await fastify.inject({
			method: 'GET',
			url: '/properties',
		});

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual(result);
	});

	it('POST /properties should create item', async () => {
		mockService.create.mockResolvedValue(mockProperty);

		const response = await fastify.inject({
			method: 'POST',
			url: '/properties',
			payload: {
				title: 'Apartamento de Luxo no Jardins',
				price: '4500000.00',
				type: 'apartamento',
				area: 240,
				city: 'São Paulo',
				state: 'SP',
			},
		});

		expect(response.statusCode).toBe(201);
		expect(response.json()).toEqual(mockProperty);
	});

	it('PATCH /properties/:id should update item', async () => {
		const updatedProperty = { ...mockProperty, title: 'Updated Title' };
		mockService.update.mockResolvedValue(updatedProperty);

		const response = await fastify.inject({
			method: 'PATCH',
			url: `/properties/${mockProperty.id}`,
			payload: { title: 'Updated Title' },
		});

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual(updatedProperty);
	});
});
