import { injectable } from 'tsyringe';
import winston from 'winston';
import { ILogger } from '@/utilities/logger/ILogger.js';
import { WinstonLoggerBuilder } from '@/utilities/logger/WinstonLoggerBuilder.js';

@injectable()
export class Logger implements ILogger {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = WinstonLoggerBuilder.build();
  }

  info(message: string, ...meta: any[]): void {
    this.logger.info(message, ...meta);
  }

  warn(message: string, ...meta: any[]): void {
    this.logger.warn(message, ...meta);
  }

  error(message: string, ...meta: any[]): void {
    this.logger.error(message, ...meta);
  }

  debug(message: string, ...meta: any[]): void {
    this.logger.debug(message, ...meta);
  }

  log(level: string, message: string, meta?: any): void {
    this.logger.log(level, message, meta);
  }

  logRequest(req: any, res: any, responseTime: number): void {
    const logData = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress,
      timestamp: new Date().toISOString(),
    };

    if (res.statusCode >= 400) {
      this.error('HTTP Request Error', logData);
    } else {
      this.info('HTTP Request', logData);
    }
  }

  logError(error: Error, context?: any): void {
    this.error(error.message, {
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    });
  }
}
