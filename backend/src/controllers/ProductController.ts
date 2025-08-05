import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { ILogger } from '@/utilities/logger';
import { IProductService } from '@/services/product';
import {
  ProductParams,
  CreateProductBody,
  UpdateProductBody,
  ProductResponse,
  ErrorResponse,
} from '@app/shared';

@injectable()
export class ProductController {
  constructor(
    @inject('IProductService') private productService: IProductService,
    @inject('ILoggerService') private logger: ILogger
  ) {}

  async getProducts(
    _req: Request<{}, ProductResponse[] | ErrorResponse>,
    res: Response<ProductResponse[] | ErrorResponse>
  ): Promise<void> {
    try {
      this.logger.debug('ProductController: Getting products');

      const products = await this.productService.getProducts();
      const productResponses = products.map(product =>
        this.toProductResponse(product)
      );
      res.json(productResponses);
    } catch (error) {
      this.logger.error('ProductController: Error getting products', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProductById(
    req: Request<ProductParams, ProductResponse | ErrorResponse>,
    res: Response<ProductResponse | ErrorResponse>
  ): Promise<void> {
    try {
      const { id } = req.params;

      this.logger.debug(`ProductController: Getting product with id: ${id}`);

      const product = await this.productService.getProductById(id);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json(this.toProductResponse(product));
    } catch (error) {
      this.logger.error(
        'ProductController: Error getting product by id',
        error
      );
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createProduct(
    req: Request<{}, ProductResponse | ErrorResponse, CreateProductBody>,
    res: Response<ProductResponse | ErrorResponse>
  ): Promise<void> {
    try {
      const productData = req.body;

      this.logger.debug('ProductController: Creating new product', productData);

      const newProduct = await this.productService.createProduct(productData);
      res.status(201).json(this.toProductResponse(newProduct));
    } catch (error) {
      this.logger.error('ProductController: Error creating product', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateProduct(
    req: Request<
      ProductParams,
      ProductResponse | ErrorResponse,
      UpdateProductBody
    >,
    res: Response<ProductResponse | ErrorResponse>
  ): Promise<void> {
    try {
      const { id } = req.params;
      const productData = req.body;

      this.logger.debug(
        `ProductController: Updating product with id: ${id}`,
        productData
      );

      const updatedProduct = await this.productService.updateProduct(
        id,
        productData
      );
      if (!updatedProduct) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json(this.toProductResponse(updatedProduct));
    } catch (error) {
      this.logger.error('ProductController: Error updating product', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteProduct(
    req: Request<ProductParams, void | ErrorResponse>,
    res: Response<void | ErrorResponse>
  ): Promise<void> {
    try {
      const { id } = req.params;

      this.logger.debug(`ProductController: Deleting product with id: ${id}`);

      const success = await this.productService.deleteProduct(id);
      if (!success) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      this.logger.error('ProductController: Error deleting product', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  private toProductResponse = (product: any): ProductResponse => ({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    price: Number(product.price),
    quantity: product.quantity,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  });
}
