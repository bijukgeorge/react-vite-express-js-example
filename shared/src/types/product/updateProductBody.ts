import { createProductSchema } from './createProductBody';

export interface UpdateProductBody {
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  quantity?: number;
}

export const updateProductSchema = createProductSchema.partial();
