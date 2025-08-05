import { Product } from '@prisma/client';
import { CreateProductBody, UpdateProductBody } from '@app/shared';

export interface IProductService {
  getProducts(): Promise<Product[]>;

  getProductById(id: string): Promise<Product | null>;

  createProduct(product: CreateProductBody): Promise<Product>;

  updateProduct(
    id: string,
    product: UpdateProductBody
  ): Promise<Product | null>;

  deleteProduct(id: string): Promise<boolean>;
}
