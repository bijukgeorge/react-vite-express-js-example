export interface ILogger {
  info(message: string, ...args: any[]): void;

  warn(message: string, ...args: any[]): void;

  error(message: string, ...args: any[]): void;

  debug(message: string, ...args: any[]): void;

  log(level: string, message: string, meta?: any): void;

  logRequest(req: any, res: any, responseTime: number): void;

  logError(error: Error, context?: any): void;
}
