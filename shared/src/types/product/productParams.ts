import { z } from 'zod';

export interface ProductParams {
  id: string;
}

export const productParamsSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
});
