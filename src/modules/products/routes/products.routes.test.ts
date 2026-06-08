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
import { ProductsController } from '../controllers/products.controller.js';
import type { IProductsService } from '../interfaces/products.service.interface.js';

describe('Products Routes', () => {
	let fastify: FastifyInstance;
	let mockService: {
		getById: Mock;
		list: Mock;
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

	beforeEach(async () => {
		fastify = Fastify();
		mockService = {
			getById: vi.fn(),
			list: vi.fn(),
			create: vi.fn(),
			update: vi.fn(),
		};

		const controller = new ProductsController({
			productsService: mockService as unknown as IProductsService,
		});

		fastify.get('/products', controller.list);
		fastify.get('/products/:id', controller.getById);
		fastify.post('/products', controller.create);
		fastify.patch('/products/:id', controller.update);

		await fastify.ready();
	});

	afterEach(async () => {
		await fastify.close();
	});

	it('GET /products/:id should return item', async () => {
		mockService.getById.mockResolvedValue(mockProduct);

		const response = await fastify.inject({
			method: 'GET',
			url: `/products/${mockProduct.id}`,
		});

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual(mockProduct);
	});

	it('GET /products should return paginated items', async () => {
		const result = { data: [mockProduct], total: 1 };
		mockService.list.mockResolvedValue(result);

		const response = await fastify.inject({
			method: 'GET',
			url: '/products',
		});

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual(result);
	});

	it('POST /products should create item', async () => {
		mockService.create.mockResolvedValue(mockProduct);

		const response = await fastify.inject({
			method: 'POST',
			url: '/products',
			payload: { name: 'Concrete Vase', basePrice: '45.00' },
		});

		expect(response.statusCode).toBe(201);
		expect(response.json()).toEqual(mockProduct);
	});

	it('PATCH /products/:id should update item', async () => {
		const updatedProduct = { ...mockProduct, name: 'Updated Name' };
		mockService.update.mockResolvedValue(updatedProduct);

		const response = await fastify.inject({
			method: 'PATCH',
			url: `/products/${mockProduct.id}`,
			payload: { name: 'Updated Name' },
		});

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual(updatedProduct);
	});
});
