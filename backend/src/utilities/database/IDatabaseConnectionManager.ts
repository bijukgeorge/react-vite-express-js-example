import { PrismaClient } from '@prisma/client';

export interface IDatabaseConnectionManager {
  get client(): PrismaClient;

  connect(): Promise<void>;

  disconnect(): Promise<void>;

  healthCheck(): Promise<boolean>;
}
