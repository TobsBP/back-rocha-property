import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { NotFoundError } from '../../../core/errors/index.js';
import type { IGalleryRepository } from '../interfaces/gallery.repository.interface.js';
import { GalleryService } from './gallery.service.js';

describe('GalleryService', () => {
	let service: GalleryService;
	let mockRepo: {
		findById: Mock;
		create: Mock;
	};

	beforeEach(() => {
		mockRepo = {
			findById: vi.fn(),
			create: vi.fn(),
		};
		service = new GalleryService({
			galleryRepository: mockRepo as unknown as IGalleryRepository,
		});
	});

	it('should find an item by id', async () => {
		const item = { id: '123', name: 'Test' };
		mockRepo.findById.mockResolvedValue(item);
		await expect(service.getById('123')).resolves.toEqual(item);
	});

	it('should throw NotFoundError if item is not found', async () => {
		mockRepo.findById.mockResolvedValue(null);
		await expect(service.getById('123')).rejects.toThrow(NotFoundError);
	});
});
