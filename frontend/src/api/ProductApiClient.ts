import type {
  ProductResponse,
  CreateProductBody,
  UpdateProductBody,
} from '@app/shared';
import {
  createProductSchema,
  updateProductSchema,
  productParamsSchema,
} from '@app/shared';
import { ApiClient } from './ApiClient';

export class ProductApiClient {
  private static apiClient = new ApiClient();

  static async getProducts(): Promise<ProductResponse[]> {
    return this.apiClient.get<ProductResponse[]>('/products');
  }

  static async getProductById(id: string): Promise<ProductResponse> {
    const result = productParamsSchema.safeParse({ id });
    if (!result.success) {
      throw new Error(`Invalid product ID: ${result.error.issues[0]?.message}`);
    }

    return this.apiClient.get<ProductResponse>(`/products/${id}`);
  }

  static async createProduct(
    product: CreateProductBody
  ): Promise<ProductResponse> {
    const result = createProductSchema.safeParse(product);
    if (!result.success) {
      throw new Error(
        `Invalid product data: ${result.error.issues[0]?.message}`
      );
    }

    return this.apiClient.post<ProductResponse>('/products', result.data);
  }

  static async updateProduct(
    id: string,
    product: UpdateProductBody
  ): Promise<ProductResponse> {
    const idResult = productParamsSchema.safeParse({ id });
    if (!idResult.success) {
      throw new Error(
        `Invalid product ID: ${idResult.error.issues[0]?.message}`
      );
    }

    const productResult = updateProductSchema.safeParse(product);
    if (!productResult.success) {
      throw new Error(
        `Invalid product data: ${productResult.error.issues[0]?.message}`
      );
    }

    return this.apiClient.put<ProductResponse>(
      `/products/${id}`,
      productResult.data
    );
  }

  static async deleteProduct(id: string): Promise<void> {
    const result = productParamsSchema.safeParse({ id });
    if (!result.success) {
      throw new Error(`Invalid product ID: ${result.error.issues[0]?.message}`);
    }

    return this.apiClient.delete<void>(`/products/${id}`);
  }
}
