import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export class WinstonLoggerBuilder {
  static build(): winston.Logger {
    const transports: winston.transport[] = [];

    this.addConsoleLayer(transports);
    this.addAllLogsLayer(transports);
    this.addErrorsLayer(transports);

    return winston.createLogger({
      level: process.env['LOG_LEVEL'] || 'info',
      format: this.logsFormat(),
      transports,
      exitOnError: false,
      defaultMeta: {
        service: 'backend-api',
        version: process.env['npm_package_version'] || '1.0.0',
      },
    });
  }

  private static addConsoleLayer(transports: winston.transport[]) {
    const { printf } = winston.format;

    const consoleFormat = printf(({ level, message, timestamp, stack }) => {
      const logMessage = stack || message;
      return `${timestamp} [${level.toUpperCase()}]: ${logMessage}`;
    });

    transports.push(
      new winston.transports.Console({
        format: this.logsFormat([consoleFormat]),
        level: process.env['LOG_LEVEL_CONSOLE'] || 'info',
      })
    );
  }

  private static addAllLogsLayer(transports: winston.transport[]) {
    transports.push(
      new DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: this.logsFormat(),
        level: 'info',
      })
    );
  }

  private static addErrorsLayer(transports: winston.transport[]) {
    transports.push(
      new DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
        format: this.logsFormat(),
        level: 'error',
      })
    );
  }

  private static logsFormat(
    customFormats: winston.Logform.Format[] = []
  ): winston.Logform.Format {
    const { combine, timestamp, errors, json } = winston.format;

    return combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      json(),
      ...customFormats
    );
  }
}
