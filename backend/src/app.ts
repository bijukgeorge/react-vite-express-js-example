import express, { Express } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import '@/container.js';
import { container } from '@/container.js';
import { loggingMiddleware } from '@/middleware/loggingMiddleware.js';
import indexRouter from '@/routes/index.js';
import { IDatabaseConnectionManager } from '@/utilities/database';

const app: Express = express();

const database = container.resolve<IDatabaseConnectionManager>(
  'IDatabaseConnectionManager'
);
database.connect().catch(() => process.exit(1));

// Lifecycle management

process.on('beforeExit', async () => await database.disconnect());

async function shutDown(eventName: string): Promise<void> {
  console.log(`Received ${eventName}, shutting down...`);
  await database.disconnect();
  process.exit(0);
}

process.on('SIGINT', async () => shutDown('SIGINT'));

process.on('SIGTERM', async () => await shutDown('SIGTERM'));

// App Setup

app.use(loggingMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', indexRouter);

export default app;
