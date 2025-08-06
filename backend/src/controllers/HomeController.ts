import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { ILogger } from '@/utilities/logger';
import { IDatabaseConnectionManager } from '@/utilities/database';

@injectable()
export class HomeController {
  constructor(
    @inject('ILoggerService') private logger: ILogger,
    @inject('IDatabaseConnectionManager')
    private database: IDatabaseConnectionManager
  ) {}

  async getHealth(req: Request, res: Response): Promise<void> {
    try {
      this.logger.info('HomeController: Health check requested');
      const dbHealthy = await this.database.healthCheck();
      res.status(dbHealthy ? 200 : 503).json({
        status: dbHealthy ? 'healthy' : 'unhealthy',
        database: dbHealthy ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.logError(error as Error, {
        method: 'getHealth',
        requestId: req.requestId,
      });
      res.status(503).json({
        status: 'unhealthy',
        database: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
