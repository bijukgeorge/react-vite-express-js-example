import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { ILogger } from '@/utilities/logger';

export function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const logger = container.resolve<ILogger>('ILoggerService');
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 15);
  req.requestId = requestId;

  logger.debug('Incoming Request', {
    requestId,
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip || req.socket?.remoteAddress || 'unknown',
    timestamp: new Date().toISOString(),
  });

  const originalEnd = res.end.bind(res);
  res.end = function (...args: any[]): Response {
    const responseTime = Date.now() - startTime;
    logger.logRequest(req, res, responseTime);

    return originalEnd(...args);
  };

  next();
}

// Extend Express Request interface to include requestId
declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}
