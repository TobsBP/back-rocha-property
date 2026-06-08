import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import { getDb } from '../../infra/db/client.js';
import { ProductsController } from '../../modules/products/controllers/products.controller.js';
import { ProductsRepository } from '../../modules/products/repositories/products.repository.js';
import { ProductsService } from '../../modules/products/services/products.service.js';
import { UsersController } from '../../modules/users/controllers/users.controller.js';
import { UsersRepository } from '../../modules/users/repositories/users.repository.js';
import { UsersService } from '../../modules/users/services/users.service.js';

export const container = createContainer({
	injectionMode: InjectionMode.PROXY,
});

export function setupContainer() {
	container.register({
		// Infra
		db: asValue(getDb()),

		// Repositories
		usersRepository: asClass(UsersRepository).singleton(),

		// Services
		usersService: asClass(UsersService).singleton(),

		// Controllers
		usersController: asClass(UsersController).singleton(),
		productsRepository: asClass(ProductsRepository).singleton(),
		productsService: asClass(ProductsService).singleton(),
		productsController: asClass(ProductsController).singleton(),
	});

	return container;
}
