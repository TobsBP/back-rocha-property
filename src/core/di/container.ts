import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import { getDb } from '@/infra/db/client.js';
import { AuthController } from '@/modules/auth/controllers/auth.controller.js';
import { AuthService } from '@/modules/auth/services/auth.service.js';
import { ProductsController } from '@/modules/products/controllers/products.controller.js';
import { ProductsRepository } from '@/modules/products/repositories/products.repository.js';
import { ProductsService } from '@/modules/products/services/products.service.js';
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
		productsRepository: asClass(ProductsRepository).singleton(),

		// Services
		usersService: asClass(UsersService).singleton(),
		productsService: asClass(ProductsService).singleton(),
		authService: asClass(AuthService).singleton(),

		// Controllers
		usersController: asClass(UsersController).singleton(),
		productsController: asClass(ProductsController).singleton(),
		authController: asClass(AuthController).singleton(),
	});

	return container;
}
