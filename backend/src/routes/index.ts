import express, { Router } from 'express';
import { container } from 'tsyringe';
import { HomeController } from '@/controllers/HomeController.js';

const router: Router = express.Router();

// Get the controller instance from the DI container
const homeController = container.resolve<HomeController>('HomeController');

/* GET health check. */
router.get('/health', (req, res) => homeController.getHealth(req, res));

export default router;
