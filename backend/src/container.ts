import 'reflect-metadata';
import { container } from 'tsyringe';
import { ILogger, Logger } from '@/utilities/logger/index.js';

container.registerSingleton<ILogger>('ILoggerService', Logger);

export { container };
