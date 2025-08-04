import express, { Express } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import '@/container.js';
import { loggingMiddleware } from '@/middleware/loggingMiddleware.js';
import indexRouter from '@/routes/index.js';
import usersRouter from '@/routes/users.js';

const app: Express = express();

app.use(loggingMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
