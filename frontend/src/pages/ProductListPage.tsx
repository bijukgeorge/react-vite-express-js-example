import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductList } from '@/components/ProductList';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductApiClient } from '@/api/ProductApiClient.ts';
import type { ProductResponse, GetProductsQuery } from '@app/shared';
import { AppRoutes } from '@/AppRoutes';
import { filterProducts, getFilterStats } from '@/utils/helpers.ts';
import { Button, ButtonVariants } from '@/atoms/Button';
import { Header } from '@/components/Header';

export default function ProductListPage() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [filters, setFilters] = useState<GetProductsQuery>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters);
  }, [products, filters]);

  const filterStats = useMemo(() => {
    return getFilterStats(products, filteredProducts);
  }, [products, filteredProducts]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedProducts = await ProductApiClient.getProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: GetProductsQuery) =>
    setFilters(newFilters);

  const handleEditProduct = (productId: string) =>
    navigate(AppRoutes.ProductEdit.replace(':id', productId));

  return (
    <div className="max-w-7xl mx-auto p-8 flex flex-col gap-6">
      <Header
        title="Products"
        description="Manage your product inventory"
        actions={
          <Link to={AppRoutes.ProductAdd}>
            <Button variant={ButtonVariants.Primary}>Add Product</Button>
          </Link>
        }
      />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="text-red-800">{error}</div>
        </div>
      )}

      <ProductFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        products={products}
      />

      <ProductList
        products={filteredProducts}
        onEditProduct={handleEditProduct}
        loading={loading}
      />

      {!loading && (
        <div className="text-center text-gray-300 font-medium text-sm">
          {filterStats.isFiltered ? (
            <>
              Showing {filterStats.filtered} of {filterStats.total} products
              {Object.keys(filters).length > 0 && (
                <span className="ml-2 text-blue-600">
                  • {Object.keys(filters).length} filter
                  {Object.keys(filters).length !== 1 ? 's' : ''} applied
                </span>
              )}
            </>
          ) : (
            <>Showing all {filterStats.total} products</>
          )}
        </div>
      )}
    </div>
  );
}
