import 'reflect-metadata';
import { container } from 'tsyringe';
import { IProductService, ProductService } from '@/services/product/index.js';
import {
  IDatabaseConnectionManager,
  DatabaseConnectionManager,
} from '@/utilities/database/index.js';
import { ILogger, Logger } from '@/utilities/logger/index.js';
import { ProductController } from '@/controllers/ProductController.js';

// Controllers
container.registerSingleton<ProductController>(
  'ProductController',
  ProductController
);

// Services
container.registerSingleton<IProductService>('IProductService', ProductService);

// Utilities
container.registerSingleton<ILogger>('ILoggerService', Logger);
container.registerSingleton<IDatabaseConnectionManager>(
  'IDatabaseConnectionManager',
  DatabaseConnectionManager
);

export { container };
