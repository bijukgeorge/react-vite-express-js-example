import type { ProductResponse, GetProductsQuery } from '@app/shared';

export function filterProducts(
  products: ProductResponse[],
  filters: GetProductsQuery
): ProductResponse[] {
  return products.filter(product => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }

    if (filters.availableOnly && product.quantity <= 0) {
      return false;
    }

    return true;
  });
}

export function getFilterStats(
  allProducts: ProductResponse[],
  filteredProducts: ProductResponse[]
) {
  return {
    total: allProducts.length,
    filtered: filteredProducts.length,
    isFiltered: filteredProducts.length !== allProducts.length,
  };
}
