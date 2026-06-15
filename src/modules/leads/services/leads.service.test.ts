import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { NotFoundError } from '../../../core/errors/index.js';
import type { ILeadsRepository } from '../interfaces/leads.repository.interface.js';
import { LeadsService } from './leads.service.js';

describe('LeadsService', () => {
	let service: LeadsService;
	let mockRepo: {
		findAll: Mock;
		findById: Mock;
		create: Mock;
		delete: Mock;
	};

	beforeEach(() => {
		mockRepo = {
			findAll: vi.fn(),
			findById: vi.fn(),
			create: vi.fn(),
			delete: vi.fn(),
		};
		service = new LeadsService({
			leadsRepository: mockRepo as unknown as ILeadsRepository,
		});
	});

	it('should list items', async () => {
		const result = { rows: [], total: 0 };
		mockRepo.findAll.mockResolvedValue(result);
		await expect(service.list(1, 10)).resolves.toEqual(result);
	});

	it('should find an item by id', async () => {
		const item = { id: '123', name: 'Test' };
		mockRepo.findById.mockResolvedValue(item);
		await expect(service.getById('123')).resolves.toEqual(item);
	});

	it('should throw NotFoundError if item is not found on getById', async () => {
		mockRepo.findById.mockResolvedValue(null);
		await expect(service.getById('123')).rejects.toThrow(NotFoundError);
	});

	it('should delete an item', async () => {
		mockRepo.delete.mockResolvedValue({ id: '123' });
		await expect(service.delete('123')).resolves.toBeUndefined();
	});

	it('should throw NotFoundError if item is not found on delete', async () => {
		mockRepo.delete.mockResolvedValue(null);
		await expect(service.delete('123')).rejects.toThrow(NotFoundError);
	});
});
