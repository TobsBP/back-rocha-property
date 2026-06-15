import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import { getDb } from '@/infra/db/client.js';
import { AuthController } from '@/modules/auth/controllers/auth.controller.js';
import { AuthService } from '@/modules/auth/services/auth.service.js';
import { PropertiesController } from '@/modules/properties/controllers/properties.controller.js';
import { PropertiesRepository } from '@/modules/properties/repositories/properties.repository.js';
import { PropertiesService } from '@/modules/properties/services/properties.service.js';
import { UsersController } from '@/modules/users/controllers/users.controller.js';
import { UsersRepository } from '@/modules/users/repositories/users.repository.js';
import { UsersService } from '@/modules/users/services/users.service.js';
import { GalleryController } from '../../modules/gallery/controllers/gallery.controller.js';
import { GalleryRepository } from '../../modules/gallery/repositories/gallery.repository.js';
import { GalleryService } from '../../modules/gallery/services/gallery.service.js';
import { LeadsController } from '../../modules/leads/controllers/leads.controller.js';
import { LeadsRepository } from '../../modules/leads/repositories/leads.repository.js';
import { LeadsService } from '../../modules/leads/services/leads.service.js';

export const container = createContainer({
	injectionMode: InjectionMode.PROXY,
});

export function setupContainer() {
	container.register({
		// Infra
		db: asValue(getDb()),

		// Repositories
		usersRepository: asClass(UsersRepository).singleton(),
		propertiesRepository: asClass(PropertiesRepository).singleton(),
		galleryRepository: asClass(GalleryRepository).singleton(),

		// Services
		usersService: asClass(UsersService).singleton(),
		propertiesService: asClass(PropertiesService).singleton(),
		authService: asClass(AuthService).singleton(),
		galleryService: asClass(GalleryService).singleton(),

		// Controllers
		usersController: asClass(UsersController).singleton(),
		propertiesController: asClass(PropertiesController).singleton(),
		authController: asClass(AuthController).singleton(),
		galleryController: asClass(GalleryController).singleton(),
		leadsRepository: asClass(LeadsRepository).singleton(),
		leadsService: asClass(LeadsService).singleton(),
		leadsController: asClass(LeadsController).singleton(),
	});

	return container;
}
