import express, { Router } from 'express';
import { container } from 'tsyringe';
import { ProductController } from '@/controllers/ProductController.js';
import {
  validateBody,
  validateParams,
} from '@/middleware/validationMiddleware.js';
import {
  createProductSchema,
  updateProductSchema,
  productParamsSchema,
} from '@app/shared';

const router: Router = express.Router();

const productController = container.resolve<ProductController>('ProductController');

router.get('/', (req, res) => productController.getProducts(req, res));

router.get('/:id', validateParams(productParamsSchema), (req: any, res) =>
  productController.getProductById(req, res),
);

router.post('/', validateBody(createProductSchema), (req, res) =>
  productController.createProduct(req, res),
);

router.put(
  '/:id',
  validateParams(productParamsSchema),
  validateBody(updateProductSchema),
  (req: any, res) => productController.updateProduct(req, res),
);

router.delete('/:id', validateParams(productParamsSchema), (req: any, res) =>
  productController.deleteProduct(req, res),
);

export default router;
