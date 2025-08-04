import { PrismaClient } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import { IDatabaseConnectionManager } from '@/utilities/database/IDatabaseConnectionManager.js';
import { ILogger } from '@/utilities/logger';

@injectable()
export class DatabaseConnectionManager implements IDatabaseConnectionManager {
  private static instance: PrismaClient;

  constructor(@inject('ILoggerService') private readonly logger: ILogger) {
    if (!DatabaseConnectionManager.instance) {
      DatabaseConnectionManager.instance = new PrismaClient();
    }
  }

  get client(): PrismaClient {
    return DatabaseConnectionManager.instance;
  }

  async connect(): Promise<void> {
    try {
      await DatabaseConnectionManager.instance.$connect();
      this.logger.info('Connected to the database');
    } catch (error) {
      this.logger.logError(error as Error, {
        context: 'Database connection failed',
      });
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await DatabaseConnectionManager.instance.$disconnect();
      this.logger.info('Disconnected from the database');
    } catch (error) {
      this.logger.logError(error as Error, {
        context: 'Database disconnection failed',
      });
      throw error;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await DatabaseConnectionManager.instance.$queryRaw`SELECT 1`;
      this.logger.debug('Database health check passed');
      return true;
    } catch (error) {
      this.logger.logError(error as Error, {
        context: 'Database health check failed',
      });
      return false;
    }
  }
}
