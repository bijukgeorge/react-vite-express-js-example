export interface GetProductsQuery {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  availableOnly?: boolean;
}
