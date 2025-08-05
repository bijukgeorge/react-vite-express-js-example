import { z } from 'zod';

export interface CreateProductBody {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
}

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(255, 'Product name must be less than 255 characters'),

  description: z
    .string()
    .min(1, 'Product description is required')
    .max(1000, 'Product description must be less than 1000 characters'),

  category: z
    .string()
    .min(1, 'Category is required')
    .max(100, 'Category must be less than 100 characters'),

  price: z.number().min(0, 'Price must be a positive number'),

  quantity: z
    .number()
    .int('Quantity must be a whole number')
    .min(0, 'Quantity must be a non-negative integer'),
});
