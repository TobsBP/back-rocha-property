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
import { LeadsController } from '../controllers/leads.controller.js';
import type { ILeadsService } from '../interfaces/leads.service.interface.js';

describe('Leads Routes', () => {
	let fastify: FastifyInstance;
	let mockService: {
		list: Mock;
		getById: Mock;
		create: Mock;
		delete: Mock;
	};

	beforeEach(async () => {
		fastify = Fastify();
		mockService = {
			list: vi.fn(),
			getById: vi.fn(),
			create: vi.fn(),
			delete: vi.fn(),
		};

		const controller = new LeadsController({
			leadsService: mockService as unknown as ILeadsService,
		});

		fastify.get('/leads', controller.list);
		fastify.get('/leads/:id', controller.getById);
		fastify.post('/leads', controller.create);
		fastify.delete('/leads/:id', controller.delete);

		await fastify.ready();
	});

	afterEach(async () => {
		await fastify.close();
	});

	it('GET /leads should return list with paginated structure', async () => {
		const rows = [{ id: '123', name: 'Test' }];
		mockService.list.mockResolvedValue({ rows, total: 1 });

		const response = await fastify.inject({
			method: 'GET',
			url: '/leads',
		});

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual({
			data: rows,
			meta: {
				total: 1,
				page: 1,
				limit: 20,
				totalPages: 1,
			},
		});
	});

	it('GET /leads/:id should return item', async () => {
		const item = { id: '123', name: 'Test' };
		mockService.getById.mockResolvedValue(item);

		const response = await fastify.inject({
			method: 'GET',
			url: '/leads/123',
		});

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual(item);
	});

	it('POST /leads should create item', async () => {
		const body = {
			name: 'Test',
			email: 'test@example.com',
			phone: '123456',
			message: 'Hello',
		};
		const result = { id: '123', ...body };
		mockService.create.mockResolvedValue(result);

		const response = await fastify.inject({
			method: 'POST',
			url: '/leads',
			payload: body,
		});

		expect(response.statusCode).toBe(201);
		expect(response.json()).toEqual(result);
	});

	it('DELETE /leads/:id should delete item', async () => {
		mockService.delete.mockResolvedValue(undefined);

		const response = await fastify.inject({
			method: 'DELETE',
			url: '/leads/123',
		});

		expect(response.statusCode).toBe(204);
	});
});
