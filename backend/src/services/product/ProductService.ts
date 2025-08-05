import { injectable, inject } from 'tsyringe';
import { Product } from '@prisma/client';
import { IProductService } from '@/services/product/IProductService';
import { ILogger } from '@/utilities/logger';
import { IDatabaseConnectionManager } from '@/utilities/database';
import { CreateProductBody, UpdateProductBody } from '@app/shared';

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject('ILoggerService') private logger: ILogger,
    @inject('IDatabaseConnectionManager')
    private dbManager: IDatabaseConnectionManager,
  ) {
  }

  async getProducts(): Promise<Product[]> {
    this.logger.debug('Fetching all products from database');

    try {
      return await this.dbManager.client.product.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      this.logger.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    this.logger.debug(`Fetching product with id: ${id}`);

    try {
      return await this.dbManager.client.product.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Error fetching product with id ${id}:`, error);
      throw new Error('Failed to fetch product');
    }
  }

  async createProduct(productData: CreateProductBody): Promise<Product> {
    this.logger.debug(`Creating new product: ${productData.name}`, productData);
    try {
      const newProduct: Product = await this.dbManager.client.product.create({
        data: {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          quantity: productData.quantity,
          category: productData.category,
        },
      });

      this.logger.debug(
        `Successfully created product with id: ${newProduct.id}`,
      );

      return newProduct;
    } catch (error) {
      this.logger.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  async updateProduct(
    id: string,
    productData: UpdateProductBody,
  ): Promise<Product | null> {
    this.logger.debug(`Updating product with id: ${id}`, productData);
    try {
      const existingProduct = await this.dbManager.client.product.findUnique({
        where: { id },
      });

      if (!existingProduct) {
        this.logger.warn(`Product with id ${id} not found`);
        return null;
      }

      const updatedProduct: Product =
        await this.dbManager.client.product.update({
          where: { id },
          data: {
            ...(productData.name !== undefined && { name: productData.name }),
            ...(productData.description !== undefined && {
              description: productData.description,
            }),
            ...(productData.price !== undefined && {
              price: productData.price,
            }),
            ...(productData.quantity !== undefined && {
              quantity: productData.quantity,
            }),
            ...(productData.category !== undefined && {
              category: productData.category,
            }),
          },
        });

      this.logger.debug(`Successfully updated product with id: ${id}`);

      return updatedProduct;
    } catch (error) {
      this.logger.error(`Error updating product with id ${id}:`, error);
      throw new Error('Failed to update product');
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    this.logger.debug(`Deleting product with id: ${id}`);
    try {
      const existingProduct = await this.dbManager.client.product.findUnique({
        where: { id },
      });

      if (!existingProduct) {
        this.logger.warn(`Product with id ${id} not found`);
        return false;
      }

      await this.dbManager.client.product.delete({
        where: { id },
      });

      this.logger.debug(`Successfully deleted product with id: ${id}`);
      return true;
    } catch (error) {
      this.logger.error(`Error deleting product with id ${id}:`, error);
      throw new Error('Failed to delete product');
    }
  }
}
