import 'reflect-metadata';
import { container } from 'tsyringe';
import {
  IDatabaseConnectionManager,
  DatabaseConnectionManager,
} from '@/utilities/database/index.js';
import { ILogger, Logger } from '@/utilities/logger/index.js';

container.registerSingleton<ILogger>('ILoggerService', Logger);
container.registerSingleton<IDatabaseConnectionManager>(
  'IDatabaseConnectionManager',
  DatabaseConnectionManager
);

export { container };
