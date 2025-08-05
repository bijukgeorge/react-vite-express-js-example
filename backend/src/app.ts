import express, { Express } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import '@/container.js';
import { container } from '@/container.js';
import { loggingMiddleware } from '@/middleware/loggingMiddleware.js';
import indexRouter from '@/routes/index.js';
import productsRouter from '@/routes/products.js';
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

// Enable CORS for all routes
app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(loggingMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', indexRouter);
app.use('/products', productsRouter);

export default app;
