import { GalleryController } from "../../modules/gallery/controllers/gallery.controller.js";
import { GallerySalesController } from "../../modules/gallery/controllers/gallery-sales.controller.js";
import { GalleryRepository } from "../../modules/gallery/repositories/gallery.repository.js";
import { GallerySalesRepository } from "../../modules/gallery/repositories/gallery-sales.repository.js";
import { GalleryService } from "../../modules/gallery/services/gallery.service.js";
import { GallerySalesService } from "../../modules/gallery/services/gallery-sales.service.js";
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

		// Services
		usersService: asClass(UsersService).singleton(),
		propertiesService: asClass(PropertiesService).singleton(),
		authService: asClass(AuthService).singleton(),

		// Controllers
		usersController: asClass(UsersController).singleton(),
		propertiesController: asClass(PropertiesController).singleton(),
		authController: asClass(AuthController).singleton(),
        galleryRepository: asClass(GalleryRepository).singleton(),
        galleryService: asClass(GalleryService).singleton(),
        galleryController: asClass(GalleryController).singleton(),
		gallerySalesRepository: asClass(GallerySalesRepository).singleton(),
		gallerySalesService: asClass(GallerySalesService).singleton(),
		gallerySalesController: asClass(GallerySalesController).singleton(),
	});

	return container;
}
